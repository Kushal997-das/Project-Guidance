package analysis

import (
	"errors"
	"fmt"
	"github.com/Shobhit-Nagpal/freqli/pkg/shell"
	"sort"
	"strings"
)

type Command struct {
	Name  string
	Count int
}

func parseCommands(commands []string, userShell string) ([]string, error) {
	switch userShell {
	case shell.BASH:
		return parseBashHistory(commands), nil
	case shell.ZSH:
		return parseZshHistory(commands), nil
	default:
		return nil, errors.New(fmt.Sprintf("%s shell is not supported\n", userShell))
	}
}

func parseBashHistory(commands []string) []string {
	bashCommands := []string{}

	for _, command := range commands {
		cmd := strings.Fields(command)
		if len(cmd) > 0 {
			bashCommands = append(bashCommands, cmd[0])
		}
	}

	return bashCommands
}

func parseZshHistory(commands []string) []string {
	zshCommands := []string{}

	for _, command := range commands {
		fullCmd := strings.SplitN(command, ";", 2)
		if len(fullCmd) < 2 {
			continue
		}

		mainCmd := strings.Fields(fullCmd[1])

		if len(mainCmd) > 0 {
			zshCommands = append(zshCommands, mainCmd[0])
		}
	}
	return zshCommands
}

func printStats(stats map[string]int) {
	sortedStats := []Command{}

	for command, count := range stats {
		sortedStats = append(sortedStats, Command{Name: command, Count: count})
	}

	sort.Slice(sortedStats, func(i, j int) bool {
		return sortedStats[i].Count < sortedStats[j].Count
	})

	for _, cmd := range sortedStats {
		fmt.Printf("%s: %d\n", cmd.Name, cmd.Count)
	}
}
