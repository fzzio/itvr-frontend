module.exports = {
  apps: [{
    name: "joey-api",
    script: "npm",
    args: "run start",
    cwd: "/home/interviewer/itvr-interviewer",
    env: {
      NODE_ENV: "production",
      GOOGLE_GENERATIVE_AI_API_KEY: "AIzaSyDJdC6t8gyIYs0lcW4mOkYmKsh03skK8-w"
    }
  }]
};
