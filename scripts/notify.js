const message = process.argv[2] || "Task complete";
const status = process.argv[3] || "info"; // success | error | info

const titles = {
  success: "Portfolio \u2714",
  error: "Portfolio \u2716",
  info: "Portfolio",
};

async function notify() {
  const notifierModule = await import("node-notifier");
  const notifier = notifierModule.default ?? notifierModule;

  notifier.notify(
    {
      title: titles[status] || titles.info,
      message,
      sound: true,
      wait: false,
      appID: "Portfolio Dev",
    },
    (err) => {
      if (err) process.stdout.write("\x07"); // fallback terminal bell
    }
  );
}

notify().catch(() => {
  process.stdout.write("\x07");
});
