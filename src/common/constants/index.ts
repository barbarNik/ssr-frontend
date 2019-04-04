const constants = {
  ENV_FLAVOR: (typeof window !== "undefined" ? window.ENV_FLAVOR : process.env.ENV_FLAVOR) || "",
};

export default constants;
