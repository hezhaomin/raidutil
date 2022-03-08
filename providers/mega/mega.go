package mega

import v1 "github.com/hezhaomin/raidutil/api/v1"

type Mega struct {
	*v1.RaidType
}

func New(r *v1.RaidType) (mega *Mega, err error) {
	mega = &Mega{r}
	return mega, err
}

func (m *Mega) GetControllerCount() (count int, err error) {
	return count, err
}
func (m *Mega) Get() (err error) {
	return err

}
func (m *Mega) GetPhysicalDrive(controller int) (pdss []v1.PhysicalDriveStat, err error) {
	return pdss, err
}
func (m *Mega) GetVirtualDrive(controller int) (vdss []v1.VirtualDriveStat, err error) {
	return vdss, err
}
func (m *Mega) CreateRaid(controller int, raidType int, name string, size string, drivers string, cache string, wtype string) (err error) {
	return err
}
func (m *Mega) DelRaid(controller int, vd int) (err error) {
	return err
}

func (m *Mega) InitRaid(controller int, vd int, full bool) (err error) {
	return err
}
