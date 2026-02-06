const yesterdayInput = document.getElementById("yesterday");
const todayInput = document.getElementById("today");
const blockersInput = document.getElementById("blockers");
const standupOutput = document.getElementById("standup");
const status = document.getElementById("status");

const formatSection = (title, value) => {
  const trimmed = value.trim();
  return `${title}: ${trimmed || "None"}`;
};

const buildStandup = () => {
  return [
    formatSection("Yesterday", yesterdayInput.value),
    formatSection("Today", todayInput.value),
    formatSection("Blockers", blockersInput.value),
  ].join("\n");
};

const setStatus = (message) => {
  status.textContent = message;
};

const copyToClipboard = async (text) => {
  if (!navigator.clipboard) {
    standupOutput.select();
    document.execCommand("copy");
    return;
  }
  await navigator.clipboard.writeText(text);
};

document.getElementById("generate").addEventListener("click", async () => {
  const standupText = buildStandup();
  standupOutput.value = standupText;

  try {
    await copyToClipboard(standupText);
    setStatus("Copied to clipboard.");
  } catch (error) {
    console.error(error);
    setStatus("Unable to copy. You can copy manually.");
  }
});

document.getElementById("reset").addEventListener("click", () => {
  yesterdayInput.value = "";
  todayInput.value = "";
  blockersInput.value = "";
  standupOutput.value = "";
  setStatus("");
});
