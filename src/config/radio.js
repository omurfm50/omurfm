export const RADIO_CONFIG = {
  name: "Ömür FM",
  slogan: "Kalplerin Buluştuğu Radyo",

  streamUrl: "",
  metadataUrl: "/api/radio-status",

  flatcast: {
    iframeUrl: "https://flatcastx.com/sid/1567",
    width: 800,
    height: 600
  },

  casterWidget: {
    publicToken: "79ea291b-69b6-42ba-a9e7-378a6c72cc54",
    type: "newStreamPlayer",
    theme: "dark",
    color: "e81e4d",
    channelId: "",
    scriptUrl: "https://cdn.cloud.caster.fm/widgets/embed.js"
  },

  chat: {
    iframeUrl: "https://chameleon.chattersnet.nl/chat/14873",
    userCountUrl:
      "https://chameleon.chattersnet.nl/api/usercount.php?channel=OmurFm",
    roomName: "Ömür FM Ana Oda",
    channelName: "OmurFm"
  },

  requestWhatsapp: "",
  instagramUrl: "",
  facebookUrl: "",

  currentDj: {
    name: "Ömür FM",
    show: "Canlı Yayın",
    schedule: "",
    image: ""
  }
};
