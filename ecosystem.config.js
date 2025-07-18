module.exports = {
  apps: [{
    name: "interviewer",
    script: "npm",
    args: "run start",
    cwd: "/home/interviewer/itvr-frontend",
    env: {
      NODE_ENV: "production",
      BASE_PATH: "/interviewer",
      PORT: "3011"
    }
  }]
};
