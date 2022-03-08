package providers

import (
	"fmt"

	v1 "github.com/raidutil/api/v1"
	"github.com/raidutil/providers/mega"
	"github.com/raidutil/providers/stor"
)

type RaidUtils interface {
	GetControllerCount() (count int, err error)
	Get() (err error)
	GetPhysicalDrive(controller int) (vdss []v1.PhysicalDriveStat, err error)
	GetVirtualDrive(controller int) (pdss []v1.VirtualDriveStat, err error)
	CreateRaid(controller int, raidType int, name string, size string, drivers string, cache string, wtype string) (err error)
	DelRaid(controller int, vd int) (err error)
	InitRaid(controller int, vd int, full bool) (err error)
}

func NewRaidProvider(r *v1.RaidType) (ru RaidUtils, err error) {
	switch r.Type {
	case "mega":
		return mega.New(r)
	case "stor":
		return stor.New(r)
	default:
		return ru, fmt.Errorf("not sport raid utils type:%s", r.Type)
	}

}
