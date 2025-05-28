export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}

export const formatLyrics = (text: string): string => {
  if (!text) return ""

  const sections = text.split(/\n\s*\n/)

  const processedSections = sections.map((section, index) => {
    if (section.includes("[Verse") || section.includes("[Chorus") || section.includes("[Bridge")) {
      return section
    }

    const isLikelyChorus =
      sections.filter((s) => s.toLowerCase().replace(/\s+/g, "") === section.toLowerCase().replace(/\s+/g, "")).length >
      1

    let sectionHeader = ""
    if (isLikelyChorus && !section.includes("[Chorus]")) {
      sectionHeader = "[Chorus]\n"
    } else if (index === 0) {
      sectionHeader = "[Verse 1]\n"
    } else if (!isLikelyChorus) {
      sectionHeader = `[Verse ${Math.floor(index / 2) + 1}]\n`
    }

    const lines = section.split("\n")
    const processedLines = lines.map((line) => {
      if (line.length <= 50) return line

      const breakPoints = [",", ";", ".", ":", " and ", " or ", " but ", " so ", " when ", " where "]

      for (const breakPoint of breakPoints) {
        const breakIndex = line.indexOf(breakPoint)
        if (breakIndex > 15 && breakIndex < 45) {
          const firstPart = line.substring(0, breakIndex + breakPoint.length).trim()
          const secondPart = line.substring(breakIndex + breakPoint.length).trim()
          return firstPart + "\n" + secondPart
        }
      }

      const words = line.split(" ")
      let firstHalf = ""
      let secondHalf = ""
      let charCount = 0

      for (let i = 0; i < words.length; i++) {
        if (charCount + words[i].length > 40 && i > 0) {
          secondHalf = words.slice(i).join(" ")
          break
        }
        firstHalf += (i > 0 ? " " : "") + words[i]
        charCount += words[i].length + 1
      }

      return secondHalf ? firstHalf + "\n" + secondHalf : line
    })

    return sectionHeader + processedLines.join("\n")
  })

  return processedSections.join("\n\n")
}
