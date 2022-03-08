package v1

type RaidType struct {
	Type         string
	BinPath      string
	AdapterCount int
	AdapterStats []AdapterStat `json:"adapter_stats"`
}

type AdapterStat struct {
	AdapterId          int                 `json:"adapter_id"`
	VirtualDriveStats  []VirtualDriveStat  `json:"virtual_drive_stats"`
	PhysicalDriveStats []PhysicalDriveStat `json:"physical_drive_stats"`
}

type VirtualDriveStat struct {
	VirtualDrive   int    `json:"virtual_drive"`
	Name           string `json:"name"`
	Size           string `json:"size"`
	State          string `json:"state"`
	NumberOfDrives int    `json:"number_of_drives"`
	Encryptiontype string `json:"encryption_type"`
}

type PhysicalDriveStat struct {
	EnclosureDeviceId      int    `json:"enclosure_device_id"`
	DeviceId               int    `json:"device_id"`
	SlotNumber             int    `json:"slot_number"`
	MediaErrorCount        int    `json:"media_error_count"`
	OtherErrorCount        int    `json:"other_error_count"`
	PredictiveFailureCount int    `json:"predictive_failure_count"`
	Pdtype                 string `json:"pd_type"`
	RawSize                string `json:"raw_size"`
	FirmwareState          string `json:"firmware_state"`
	Brand                  string `json:"brand"`
	Model                  string `json:"model"`
	SerialNumber           string `json:"serial_number"`
	DriveTemperature       string `json:"drive_emperature"`
}
