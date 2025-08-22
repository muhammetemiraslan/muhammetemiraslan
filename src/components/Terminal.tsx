import React, { useState } from "react";
import { Input } from "reactstrap";

type CommandFunction = (currentDir?: string) => string;

const commands: Record<string, CommandFunction> = {
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

  restricted: () => "Erişim reddedildi: İzniniz yok", // Uyarı

  ls: (currentDir = "") => {
    if (currentDir.endsWith("projects")) {
      return `- GitHub: github.com/muhammetemiraslan
- LinkedIn: linkedin.com/in/muhammetemiraslan`;
    }
    if (currentDir.endsWith("about")) {
      return "Merhaba! Ben Muhammet Emir Aslan. Full-Stack web geliştiricisiyim.";
    }
    if (currentDir.endsWith("contact")) {
      return `- Email: muhammetemiraslan0@gmail.com
- Telefon: +90 555 555 5555`;
    }
    // Ana dizin
    return "about  projects  contact  restricted";
  },
};

export default function Terminal() {
  const initialHistory = [
    "PortfolioOS [Version 1.0.0]",
    "(c) Muhammet Emir Aslan. All rights reserved.",
    "Type 'help' to see available commands",
    "",
  ];

  const [history, setHistory] = useState<string[]>([...initialHistory]);
  const [input, setInput] = useState("");
  const [currentDir, setCurrentDir] = useState("C:\\Users\\muhammetemiraslan");

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return "";

    // cls komutu
    if (trimmed.toLowerCase() === "cls") {
      setHistory([...initialHistory]);
      return "";
    }

    if (trimmed.toLowerCase().startsWith("cd")) {
      const dir = trimmed.slice(2).trim();

      if (dir === "restricted") {
        setHistory((prev) => [
          ...prev,
          `${currentDir}> ${trimmed}`,
          "Erişim reddedildi: İzniniz yok",
        ]);
        setInput("");
        return "";
      }

      if (dir === "..") {
        const parts = currentDir.split("\\");
        if (parts.length > 1) parts.pop();
        setCurrentDir(parts.join("\\"));
        return "";
      }

      const validDirs = ["about", "projects", "contact"];
      if (validDirs.includes(dir)) {
        setCurrentDir(`C:\\Users\\muhammetemiraslan\\${dir}`);
        return "";
      }

      setHistory((prev) => [
        ...prev,
        `${currentDir}> ${trimmed}`,
        `Directory not found: ${dir}`,
      ]);
      setInput("");
      return "";
    }

    // diğer komutlar
    const command = commands[trimmed.toLowerCase()];
    if (!command) return `Command not found: ${cmd}`;
    return command(currentDir);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const trimmedInput = input.trim();
    const output = handleCommand(trimmedInput);

    // cls veya cd sonrası sadece input temizlenir
    if (
      trimmedInput.toLowerCase() === "cls" ||
      trimmedInput.toLowerCase().startsWith("cd")
    ) {
      setInput("");
      return;
    }

    setHistory((prev) => [...prev, `${currentDir}> ${trimmedInput}`, output]);
    setInput("");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#1e1e1e",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 0.5rem",
          fontFamily: "Segoe UI, sans-serif",
          fontSize: "0.9rem",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              padding: "0.2rem 0.6rem",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            +
          </div>
          <div
            style={{
              backgroundColor: "#0c0c0c",
              padding: "0.4rem 1rem",
              marginLeft: "0.3rem",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
            }}
          >
            <span>Komut İstemi</span>
            <span
              style={{
                color: "#aaa",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              ✕
            </span>
          </div>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        style={{
          flex: 1,
          backgroundColor: "black",
          color: "limegreen",
          fontFamily: "monospace",
          fontSize: "18px",
          padding: "1rem",
          overflowY: "auto",
        }}
      >
        {history.map((line, i) => (
          <div key={i}>
            {line.split("\n").map((subLine, j) => (
              <span key={j}>
                {subLine}
                <br />
              </span>
            ))}
          </div>
        ))}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center" }}
        >
          <span style={{ marginRight: "0.5rem" }}>{currentDir}&gt;</span>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "limegreen",
              fontFamily: "monospace",
              fontSize: "18px",
              padding: 0,
              outline: "none",
              boxShadow: "none",
            }}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
