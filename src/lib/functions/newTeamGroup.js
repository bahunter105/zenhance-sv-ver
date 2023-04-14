  import Konva from 'konva'
  import teamSVG from '$lib/images/Team Created.svg'
  import infoButtonSVG from '$lib/images/i-blob.svg'
  import orangeAddSVG from '$lib/images/Orange Add.svg'
  import newPersonSVG from '$lib/images/Person Blob.svg'

function getAngleXYCordinates(originX, originY, radius, numberOfSiblings) { //,person = false //) {
  // let newRadius = radius + 250*(Math.ceil(((numberOfSiblings+1)-1)/3))

  let angle
  // if(person===true){
    // angle = -45 + (numberOfSiblings*25)
    angle = -45 + (numberOfSiblings*45)
  // }else{
  // switch((numberOfSiblings+1) % 3) {
  //   case 0:
  //     angle = 85
  //     break;
  //   case 1:
  //     angle = 5
  //     break;
  //   case 2:
  //     angle = 45
  //     break;
  // };
  // }


  let x = originX + radius * Math.cos(Math.PI * angle / 180)
  let y = originY + radius * Math.sin(Math.PI * angle / 180)

  return {x:x, y:y}
}

function addNewTeamGroup(layer, coordinates, data = {'name': 'Name'}) {
    // add newTeamGroup
    let newTeamGroup = new Konva.Group({
      draggable: true,
    })
    layer.add(newTeamGroup)
    let newTeamX = coordinates.x
    let newTeamY = coordinates.y

    // add Orbit
    let orbitCircle = new Konva.Circle({
      x: newTeamX,
      y: newTeamY,
      radius: 110,
      offsetX: 3,
      offsetY: 3,
      fill: 'rgba(0,0,255,0)',
      stroke: 'rgb(255, 168, 0, 0.5)',
      strokeWidth: 1,
      dash: [1,1],
    });
    newTeamGroup.add(orbitCircle);
    orbitCircle.zIndex(0)


    // add newTeamCircle
    let newTeamImageObj = new Image();
    newTeamImageObj.onload = function () {
      let newTeam = new Konva.Image({
        image:newTeamImageObj,
        x: newTeamX,
        y: newTeamY,
        width: 180,
        height: 180,
        offsetX: 90,
        offsetY: 90,
        id: "teamGroup"
      });

      // add the shape to the layer
      newTeamGroup.add(newTeam)
      newTeam.zIndex(1)

      // add other functions
      // newTeam.on('pointerdown', function () {
      //   let createPerson = stage.findOne("#createPerson")
      //   let createTeam = stage.findOne("#createTeam")
      //   if (createPerson.visible() === true) {
      //     createPerson.hide()
      //     createTeam.hide()
      //   } else {
      //     createPerson.show()
      //     createTeam.show()
      //   }
      // })

      // add cursor styling
      newTeam.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
      });
      newTeam.on('mouseout', function () {
        document.body.style.cursor = 'default';
      });
    };
    newTeamImageObj.src = teamSVG

    // add newTeamName
    let newTeamName = new Konva.Text({
      text: data.name,
      width: 180,
      x: coordinates.x - 90,
      y: coordinates.y + 12,
      fontSize: 15,
      fontStyle: 'bold',
      align: 'center',
      fill: 'white',
    });
    // add cursor styling
    newTeamName.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
    });
    newTeamName.on('mouseout', function () {
      document.body.style.cursor = 'default';
    });
    newTeamGroup.add(newTeamName)

    // add infoButton
    let newTeamInfoButtonImageObj = new Image();
    newTeamInfoButtonImageObj.onload = function () {
      let newTeamInfoButton = new Konva.Image({
        image:newTeamInfoButtonImageObj,
        // x = radius * Math.cos(Math.PI * angle / 180);
        x: newTeamX + 77 * Math.cos(Math.PI * -35 / 180),
        // y = radius * Math.sin(Math.PI * angle / 180);
        y: newTeamY + 77 * Math.sin(Math.PI * -35 / 180),
        // x: 0,
        // y: 0,
        width: 56,
        height: 56,
        offsetX: 28,
        offsetY: 28,
        // draggable: true,
      });

      // add the shape to the layer
      newTeamGroup.add(newTeamInfoButton)
      newTeamInfoButton.zIndex(2)
      // add other functions
      // newTeamInfoButton.on('pointerdown', function () {
      //   let createPerson = stage.findOne("#createPerson")
      //   let createTeam = stage.findOne("#createTeam")
      //   if (createPerson.visible() === true) {
      //     createPerson.hide()
      //     createTeam.hide()
      //   } else {
      //     createPerson.show()
      //     createTeam.show()
      //   }
      // })

      // add cursor styling
      newTeamInfoButton.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
      });
      newTeamInfoButton.on('mouseout', function () {
        document.body.style.cursor = 'default';
      });
    };
    newTeamInfoButtonImageObj.src = infoButtonSVG

    // orangeAdd
    let newTeamOrangeAddImageObj = new Image();
    newTeamOrangeAddImageObj.onload = function () {
      let newTeamOrangeAdd = new Konva.Image({
        image:newTeamOrangeAddImageObj,
        // x = radius * Math.cos(Math.PI * angle / 180);
        x: newTeamX + 66 * Math.cos(Math.PI * 35 / 180),
        // y = radius * Math.sin(Math.PI * angle / 180);
        y: newTeamY + 66 * Math.sin(Math.PI * 35 / 180),
        // x: 0,
        // y: 0,
        width: 40,
        height: 40,
        offsetX: 20,
        offsetY: 20,
        // draggable: true,
      });

      // add the shape to the layer
      newTeamGroup.add(newTeamOrangeAdd)
      newTeamOrangeAdd.zIndex(3)

      // add cursor styling
      newTeamOrangeAdd.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
      });
      newTeamOrangeAdd.on('mouseout', function () {
        document.body.style.cursor = 'default';
      });

      // add other functions
      newTeamOrangeAdd.on('pointerdown', function () {
        let numberOfPeople = this.parent.find('#person').length
        // set max number of team members to 8
        if (numberOfPeople < 8) {
          let coordinates = getAngleXYCordinates(newTeamX, newTeamY, 110, numberOfPeople, true)
          addNewPerson(newTeamGroup, coordinates)
        }
      })
    };
    newTeamOrangeAddImageObj.src = orangeAddSVG

    return newTeamGroup
}

function addNewPerson(group, coordinates, data = {'name': 'Person Name', 'role': 'role'}) {
    // add newPersonGroup
    let personGroup = new Konva.Group({
      draggable: true,
    })

    group.add(personGroup)

    let newPersonImageObj = new Image();
    newPersonImageObj.onload = function () {
      let newPerson = new Konva.Image({
        image:newPersonImageObj,
        x: coordinates.x,
        y: coordinates.y,
        width: 60,
        height: 60,
        offsetX: 30,
        offsetY: 30,
        id: "person",
        draggable: false,
      });

      personGroup.add(newPerson)

      if(data.expand['user'] != undefined){
        let textName = new Konva.Text({
            text: data.expand['user'].name,
            x: coordinates.x + 20,
            y: coordinates.y - 15,
            fontSize: 10,
            fontStyle: 'bold italic',
            visible: false,
          });
          personGroup.add(textName)
      } else{
        let textName = new Konva.Text({
            text: 'Not Assigned',
            x: coordinates.x + 20,
            y: coordinates.y - 15,
            fontSize: 10,
            fontStyle: 'bold italic',
            visible: false,
          });
          personGroup.add(textName)
      }

        let textRole = new Konva.Text({
          text: data.role,
          x: coordinates.x + 20,
          y: coordinates.y - 3,
          fontSize: 10,
          fontStyle: 'italic',
          visible: false,
        });
        personGroup.add(textRole)

      // add other functions
      // newPerson.on('pointerdown', function () {
      //   let createPerson = stage.findOne("#createPerson")
      //   let createTeam = stage.findOne("#createTeam")
      //   if (createPerson.visible() === true) {
      //     createPerson.hide()
      //     createTeam.hide()
      //   } else {
      //     createPerson.show()
      //     createTeam.show()
      //   }
      // })

      // add cursor styling
      newPerson.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
        this.parent.find('Text').forEach(text => text.show())
      });
      newPerson.on('mouseout', function () {
        document.body.style.cursor = 'default';
        this.parent.find('Text').forEach(text => text.hide())
      });
    };
    newPersonImageObj.src = newPersonSVG
}


export {addNewTeamGroup, getAngleXYCordinates, addNewPerson}
