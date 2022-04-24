module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        discord_blue: "#295DE7",
        discord_blurple: "#7289da",
        discord_purple: "#5865f2",
        discord_green: "#3ba55c",
        discord_serverBg: "#36393f",
        discord_serversBg: "#202225",
        discord_channelsBg: "#2f3136",
        discord_serverNameHoverBg: "#34373c",
        discord_channel: "#8e9297",
        discord_channelHoverBg: "#3a3c43",
        discord_userId: "#b9bbbe",
        discord_userSectionBg: "#292b2f",
        discord_chatHeader: "#72767d",
        discord_chatInputBg: "#40444b",
        discord_chatINputText: "#dcddde",
        discord_messageBg: "#32353b",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
