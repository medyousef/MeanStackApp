const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function getWindowsPID() {
  const { error, stdout, stderr } = await exec('for /f "tokens=5" %a in (\'netstat -aon ^| findstr 6045\') do @echo %~nxa');

  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`PID: ${stdout}`);
  return stdout.toString();
}

async function getLinuxPID() {
    const { error, stdout, stderr } = await exec('lsof -n -i tcp:6045  | awk \'/LISTEN/{print $2}\'');
  
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`PID: ${stdout}`);
    return stdout.toString();
  }

module.exports.stopWindows = async function () {
    exec('taskkill /f /pid ' + await getWindowsPID(), (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
};

module.exports.stopLinux = async function () {
    exec('kill -9 ' + await getLinuxPID(), (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`Success`);
    });
};