package analysis

import (
	"fmt"
	"log"
	"os"
	"strings"
)

func Initiate(userShell string) {
  commands := getCommandHistory(userShell)  
  stats := analyzeHistory(commands)
  printStats(stats)
}

func getCommandHistory(userShell string) []string {
  homeDir, err := os.UserHomeDir()
  if err != nil {
    log.Printf("Error getting home dir: %s", err.Error())
  }

  filename := fmt.Sprintf("%s/.%s_history",homeDir, userShell)

  historyFile, err := os.ReadFile(filename)
  if err != nil {
    log.Printf("Error reading %s file: %s", filename, err.Error())
  }

  historyCommands := strings.Split(string(historyFile), "\n")

  commands, err:= parseCommands(historyCommands, userShell)
  if err != nil {
    log.Printf("Error parsing commands: %s", err.Error())
    os.Exit(1)
  }

  return commands
}

func analyzeHistory(commands []string) map[string]int {
  commandStats := make(map[string]int)

  for _, command := range commands {
    if commandStats[command] == 0 {
      commandStats[command] = 1
    } else {
      commandStats[command]++
    }
  }

  return commandStats
}
