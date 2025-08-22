const commands: Record<string, (currentDir?: string) => string> = {
  help: () =>
    `Available commands:
help
ls
cd [dir]
cls`,

  about: () =>
    "Merhaba! Ben Muhammet Emir Aslan. Full-Stack web geliştiricisiyim.",

  projects: () =>
    `Projelerim:
- GitHub: github.com/muhammetemiraslan
- LinkedIn: linkedin.com/in/muhammetemiraslan`,

  contact: () =>
    `İletişim:
- Email: muhammetemiraslan0@gmail.com
- Telefon: +90 555 555 5555`,

  restricted: () =>
    "Erişim reddedildi: İzniniz yok", // uyarı veriyor

  ls: (currentDir = "") => {
    const dir = currentDir || "";

    // Ana dizin
    if (dir === "C:\\Users\\muhammetemiraslan") {
      return "about  projects  contact  restricted";
    }

    // Alt dizinler
    if (dir.endsWith("projects")) {
      return `- GitHub: github.com/muhammetemiraslan\n- LinkedIn: linkedin.com/in/muhammetemiraslan`;
    } else if (dir.endsWith("about")) {
      return "- Hakkımda dosyası";
    } else if (dir.endsWith("contact")) {
      return "- Email: muhammetemiraslan0@gmail.com\n- Telefon: +90 555 555 5555";
    } else if (dir.endsWith("restricted")) {
      return "Erişim reddedildi: İzniniz yok";
    }

    return "";
  },
};

export default commands;
