using Microsoft.Win32.SafeHandles;
using System.ComponentModel;
using System.Diagnostics;
using System.Runtime.InteropServices;
using Windows.Win32;
using Windows.Win32.Security;
using Windows.Win32.System.JobObjects;

namespace GenericCmsTests.Support
{


    public class MongoDbController
    {
        private readonly Process _mongoProcess;

        public MongoDbController(int port, string binPath, string dataPath)
        {
            var startInfo = new ProcessStartInfo
            {
                FileName = binPath,
                Arguments = "--dbpath " + dataPath + " --port " + port,
                UseShellExecute = false,
                RedirectStandardOutput = false,
                RedirectStandardError = false
            };

            _mongoProcess = new Process
            {
                StartInfo = startInfo
            };

        }


        public void StartMongoDb()
        {
            NativeMethods.EnsureMongoProcessesAreKilledWhenCurrentProcessIsKilled();
            _mongoProcess.Start();
        }

        public void StopMongoDb()
        {
            _mongoProcess.Kill();
            _mongoProcess.WaitForExit();
        }
    }




    internal static class NativeMethods
    {
        private static readonly object CreateJobObjectLock = new();
        private static SafeFileHandle? _jobObjectHandle;

        public static void EnsureMongoProcessesAreKilledWhenCurrentProcessIsKilled()
        {

            if (IsWindows() && !IsNetFramework())
            {
                CreateSingletonJobObject();
            }
        }

        private static bool IsWindows() => RuntimeInformation.IsOSPlatform(OSPlatform.Windows);


        private static bool IsNetFramework() => RuntimeInformation.FrameworkDescription.StartsWith(".NET Framework", StringComparison.OrdinalIgnoreCase);

        private static unsafe void CreateSingletonJobObject()
        {

            if (_jobObjectHandle != null)
            {
                return;
            }

            lock (CreateJobObjectLock)
            {
                if (_jobObjectHandle != null)
                {
                    return;
                }

                // https://www.meziantou.net/killing-all-child-processes-when-the-parent-exits-job-object.htm
                var attributes = new SECURITY_ATTRIBUTES
                {
                    bInheritHandle = false,
                    lpSecurityDescriptor = nint.Zero.ToPointer(),
                    nLength = (uint)Marshal.SizeOf(typeof(SECURITY_ATTRIBUTES)),
                };

                SafeFileHandle? jobHandle = null;

                try
                {

#pragma warning disable CA1416 // Validate platform compatibility
                    jobHandle = PInvoke.CreateJobObject(attributes, lpName: null);
#pragma warning restore CA1416 // Validate platform compatibility


                    if (jobHandle.IsInvalid)
                    {
                        throw new Win32Exception(Marshal.GetLastWin32Error());
                    }


                    var info = new JOBOBJECT_EXTENDED_LIMIT_INFORMATION
                    {
                        BasicLimitInformation = new JOBOBJECT_BASIC_LIMIT_INFORMATION
                        {
                            LimitFlags = JOB_OBJECT_LIMIT.JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE,
                        },
                    };


#pragma warning disable CA1416 // Validate platform compatibility
                    if (!PInvoke.SetInformationJobObject(jobHandle, JOBOBJECTINFOCLASS.JobObjectExtendedLimitInformation, &info, (uint)Marshal.SizeOf<JOBOBJECT_EXTENDED_LIMIT_INFORMATION>()))
                    {
                        throw new Win32Exception(Marshal.GetLastWin32Error());
                    }
#pragma warning restore CA1416 // Validate platform compatibility


#pragma warning disable CA1416 // Validate platform compatibility
                    if (!PInvoke.AssignProcessToJobObject(jobHandle, Process.GetCurrentProcess().SafeHandle))
                    {
                        throw new Win32Exception(Marshal.GetLastWin32Error());
                    }
#pragma warning restore CA1416 // Validate platform compatibility

                    _jobObjectHandle = jobHandle;
                }
                catch
                {
                    jobHandle?.Dispose();
                    throw;
                }
            }
        }
    }
}
