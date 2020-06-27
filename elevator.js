
floorSubbasement = 0
floorBasement    = 1
floorFirst       = 2
floorSecond      = 3
floorThird       = 4

floorHome = floorFirst

floors = 5

stateGoingUp = iota
stateGoingDown
stateNeutral

// E1--E9
stepWaitForCall          = 1
stepChangeOfState        = 2
stepOpenDoors            = 3
stepLetPeopleOutIn       = 4
stepCloseDoors           = 5
stepPrepareToMove        = 6
stepGoUpAFloor           = 7
stepGoDownAFloor         = 8
stepSetInactionIndicator = 9

minGiveUpTime = 30 * 10     // 30 seconds
maxGiveUpTime = 2 * 60 * 10 // 2 minutes

minInterTime = 1 * 10  // 1 seconds
maxInterTime = 90 * 10 // 90 seconds

maxTime = 1000 * 10 // stop simulation after 1000 seconds


class Node {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }

    insertRight(node) {}
    insertLeft(node) {}
    delete () {}

}



let waitQuere = new Node(0)
function sortin(){}
function immed() {}

function elevator() {}



let User = () => {
  return {
    id: 0,
    in: 1,
    out: 2,
    giveUpTime: 2,
    listNode: 1,
    giveUp: 1,

  }
}


func newSimulator() *simulator {
	return &simulator{
		wait:   newWaitQueue(),
		random: rand.New(rand.NewSource(time.Now().UnixNano())),
		ele:    newElevator(),
	}
}

// func (s *simulator) scheduleElevator(elev **node, delay int, listener waitListener) {
// 	(*elev).delete()
// 	*elev = s.wait.sortIn(newWaitElement(s.time+delay, listener))
// }
//
// func (s *simulator) scheduleElevatorImmediately(elev **node, listener waitListener) {
// 	(*elev).delete()
// 	*elev = s.wait.immed(newWaitElement(s.time, listener))
// }
