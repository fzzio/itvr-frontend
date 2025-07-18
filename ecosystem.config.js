module.exports = {
  apps: [{
    name: "interviewer",
    script: "npm",
    args: "run start",
    cwd: "/home/interviewer/itvr-frontend",
    env: {
      GOOGLE_GENERATIVE_AI_API_KEY: "AIzaSyDJdC6t8gyIYs0lcW4mOkYmKsh03skK8-w"
    }
  }]
};
