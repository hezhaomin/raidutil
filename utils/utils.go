package utils

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

func ExecCmd(command, args string) (out []byte, err error) {
	var argArray []string
	if args != "" {
		argArray = strings.Split(args, " ")
	} else {
		argArray = make([]string, 0)
	}

	cmd := exec.Command(command, argArray...)
	buf, err := cmd.Output()
	if err != nil {
		fmt.Fprintf(os.Stderr, "The command failed to perform: %s (Command: %s, Arguments: %s)", err, command, args)
		return out, err
	}

	return buf, nil
}
