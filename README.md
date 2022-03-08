# raidutil

- a tool for manager raid for megacli and storcli
-  
# Usage

	rt := v1.RaidType{
		Type:    "stor",
		BinPath: "/opt/MegaRAID/storcli/storcli64",
	}
	provider, err := providers.NewRaidProvider(&rt)
	if err != nil {
		os.Exit(1)
	}
	err = provider.Get()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	fmt.Println(rt)
