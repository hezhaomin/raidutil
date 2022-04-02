package v1

type OperateInfo struct {
	Controllers []Controllers `json:"Controllers"`
}

type CommandStatus struct {
	CLIVersion      string `json:"CLI Version"`
	OperatingSystem string `json:"Operating system"`
	Controller      int    `json:"Controller"`
	Status          string `json:"Status"`
	Description     string `json:"Description"`
}
type Controllers struct {
	CommandStatus CommandStatus `json:"Command Status"`
}
type CCounts struct {
	Controllers []CCount `json:"Controllers"`
}

type VDS struct {
	Controllers []VD `json:"Controllers"`
}
type PDS struct {
	Controllers []PD `json:"Controllers"`
}

type CountResponseData struct {
	ControllerCount int `json:"Controller Count"`
}

type VDResponseData struct {
	VirtualDrives []struct {
		DGVD    string `json:"DG/VD"`
		Type    string `json:"TYPE"`
		State   string `json:"State"`
		Access  string `json:"Access"`
		Consist string `json:"Consist"`
		Cache   string `json:"Cache"`
		Cac     string `json:"Cac"`
		SCC     string `json:"sCC"`
		Size    string `json:"Size"`
		Name    string `json:"Name"`
	} `json:"Virtual Drives"`
}

type PDResponseData struct {
	DriveInformation []struct {
		EIDSlt string `json:"EID:Slt"`
		Did    int    `json:"DID"`
		State  string `json:"State"`

		Size  string `json:"Size"`
		Intf  string `json:"Intf"`
		Med   string `json:"Med"`
		Sed   string `json:"SED"`
		Pi    string `json:"PI"`
		SeSz  string `json:"SeSz"`
		Model string `json:"Model"`
		Sp    string `json:"Sp"`
		Type  string `json:"Type"`
	} `json:"Drive Information"`
}
type CCount struct {
	CommandStatus CommandStatus     `json:"Command Status"`
	ResponseData  CountResponseData `json:"Response Data"`
}

type VD struct {
	CommandStatus CommandStatus  `json:"Command Status"`
	ResponseData  VDResponseData `json:"Response Data"`
}
type PD struct {
	CommandStatus CommandStatus  `json:"Command Status"`
	ResponseData  PDResponseData `json:"Response Data"`
}
