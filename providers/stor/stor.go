package stor

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	v1 "github.com/hezhaomin/raidutil/api/v1"
	"github.com/hezhaomin/raidutil/utils"
)

type Stor struct {
	*v1.RaidType
}

func New(r *v1.RaidType) (stor *Stor, err error) {
	stor = &Stor{r}
	return stor, err
}

func (s *Stor) GetControllerCount() (count int, err error) {

	args := "show ctrlcount j"
	info, err := utils.ExecCmd(s.BinPath, args)
	if err != nil {
		return count, err
	}
	result := v1.CCounts{}
	err = json.Unmarshal(info, &result)
	if err != nil {
		fmt.Println("1 json", err)
		return count, err
	}
	if result.Controllers[0].CommandStatus.Status == "Success" {
		count = result.Controllers[0].ResponseData.ControllerCount
		return count, nil

	}

	return count, fmt.Errorf(
		"get controller count err:%s",
		result.Controllers[0].CommandStatus.Description,
	)
}
func (s *Stor) Get() (err error) {
	count, err := s.GetControllerCount()
	if err != nil {
		return err
	}
	for i := 0; i <= count-1; i++ {
		ads := v1.AdapterStat{AdapterId: i}
		ads.PhysicalDriveStats, err = s.GetPhysicalDrive(i)
		if err != nil {
			fmt.Println(err)
			break
		}
		ads.VirtualDriveStats, err = s.GetVirtualDrive(i)
		if err != nil {
			fmt.Println(err)
			break
		}
		fmt.Println(ads)
		s.AdapterStats = append(s.AdapterStats, ads)
		fmt.Println(s)

	}
	return err

}
func (s *Stor) GetVirtualDrive(controller int) (vdss []v1.VirtualDriveStat, err error) {
	args := fmt.Sprintf("/c%d/vall show j", controller)
	info, err := utils.ExecCmd(s.BinPath, args)
	if err != nil {
		return vdss, err
	}
	result := v1.VDS{}
	err = json.Unmarshal(info, &result)
	if err != nil {
		fmt.Println("2 json", err)
		return vdss, err
	}
	if result.Controllers[0].CommandStatus.Status == "Success" {
		vdss = []v1.VirtualDriveStat{}
		vdes := result.Controllers[0].ResponseData.VirtualDrives
		for _, vd := range vdes {

			vdnum, err := strconv.ParseInt(strings.Split(vd.DGVD, "/")[1], 10, 32)
			if err != nil {
				break
			}
			vdstatus := v1.VirtualDriveStat{
				VirtualDrive:   int(vdnum),
				Name:           vd.Name,
				Size:           vd.Size,
				State:          vd.State,
				NumberOfDrives: 0,
				Encryptiontype: "",
			}
			vdss = append(vdss, vdstatus)

		}
		return vdss, nil

	}

	return vdss, fmt.Errorf(
		"get controller count err:%s",
		result.Controllers[0].CommandStatus.Description,
	)
}
func (s *Stor) GetPhysicalDrive(controller int) (pdss []v1.PhysicalDriveStat, err error) {
	args := fmt.Sprintf("/c%d/eall/sall show j", controller)
	info, err := utils.ExecCmd(s.BinPath, args)
	if err != nil {
		return pdss, err
	}
	result := v1.PDS{}
	err = json.Unmarshal(info, &result)
	if err != nil {
		fmt.Println("3 json", err)
		return pdss, err
	}
	if result.Controllers[0].CommandStatus.Status == "Success" {
		pdss = []v1.PhysicalDriveStat{}
		vdes := result.Controllers[0].ResponseData.DriveInformation

		for _, pd := range vdes {

			es := strings.Split(pd.EIDSlt, ":")
			eid, err := strconv.ParseInt(es[0], 10, 32)
			if err != nil {
				break
			}
			sid, err := strconv.ParseInt(es[1], 10, 32)
			if err != nil {
				break
			}
			pdstatus := v1.PhysicalDriveStat{
				EnclosureDeviceId:      int(eid),
				DeviceId:               int(sid),
				SlotNumber:             int(sid),
				MediaErrorCount:        0,
				OtherErrorCount:        0,
				PredictiveFailureCount: 0,
				Pdtype:                 pd.Type,
				RawSize:                pd.Size,
				FirmwareState:          pd.State,
				Model:                  pd.Model,
			}
			pdss = append(pdss, pdstatus)

		}
		return pdss, nil

	}

	return pdss, fmt.Errorf(
		"get controller count err:%s",
		result.Controllers[0].CommandStatus.Description,
	)
}

func (s *Stor) CreateRaid(controller int, raidType int, name string, size string, drivers string, cache string, wtype string) (err error) {
	args := fmt.Sprintf("/c%d add vd type=raid%d size=%s name=%s drives=%s %s %s j",
		controller, raidType, size, name, drivers, cache, wtype,
	)
	fmt.Println(args)
	info, err := utils.ExecCmd(s.BinPath, args)
	if err != nil {

		return err
	}
	result := v1.OperateInfo{}

	err = json.Unmarshal(info, &result)

	if err != nil {
		fmt.Println(err, "+++++++++++++++++++++")
		return err
	}
	fmt.Println(result.Controllers[0])
	if result.Controllers[0].CommandStatus.Status != "Success" {
		fmt.Println(err, "=============")
		return fmt.Errorf("create raid%d err:%s", raidType, result.Controllers[0].CommandStatus.Description)
	}

	return err
}

func (s *Stor) DelRaid(controller int, vd int) (err error) {
	args := fmt.Sprintf("/c%d/v%d del j", controller, vd)
	info, err := utils.ExecCmd(s.BinPath, args)
	if err != nil {
		return err
	}
	result := v1.OperateInfo{}
	err = json.Unmarshal(info, &result)
	if err != nil {
		return err
	}
	if result.Controllers[0].CommandStatus.Status != "Success" {
		return fmt.Errorf("delete raid vd%d err:%s", vd, result.Controllers[0].CommandStatus.Description)
	}
	return err

}

func (s *Stor) InitRaid(controller int, vd int, full bool) (err error) {
	initType := ""
	if full {
		initType = "full"
	}
	args := fmt.Sprintf("/c%d/v%d start init %s j", controller, vd, initType)
	info, err := utils.ExecCmd(s.BinPath, args)
	if err != nil {
		return err
	}
	result := v1.OperateInfo{}
	err = json.Unmarshal(info, &result)
	if err != nil {
		return err
	}
	if result.Controllers[0].CommandStatus.Status != "Success" {
		return fmt.Errorf("delete raid vd%d err:%s", vd, result.Controllers[0].CommandStatus.Description)
	}
	return err

}
