var hideButton = document.getElementById("hide");
var settingsPanel = document.getElementById("settings");
var controlsPanel = document.getElementById("controls");
var toolsPanel = document.getElementById("tools");
var satelitePanel = document.getElementById("satelite");
var sateliteNameText = document.getElementById("sateliteName");
var satelitePreview = document.getElementById("satelitePreview");

function ResetPosition()
{
    sSatelite = null;
    HideSatelite();
    system.position.x = canvas.width/2;
    system.position.y = canvas.height/2;
    system.size = 1;
}

function ShowHide()
{
    if(hideButton.innerText === "Hide")
    {
        hideButton.innerText = "Menu";
        settingsPanel.style.display = "none";
        controlsPanel.style.display = "none";
        toolsPanel.style.display = "none";
    }
    else
    {
        hideButton.innerText = "Hide";
        settingsPanel.style.display = "flex";
        controlsPanel.style.display = "flex";
        toolsPanel.style.display = "flex";
    }
}

function DisplaySatelite(satelite)
{
    sateliteInformation.innerText = "";
    satelitePanel.style.display = "flex";
    sateliteNameText.innerText = satelite.name;
    satelitePreview.style.width = satelite.radius * 2 + "px";
    satelitePreview.style.height = satelite.radius * 2  + "px";
    satelitePreview.style.backgroundColor = satelite.color;
    sateliteInformation.innerText += "This object have " + satelite.satelites.length + " satelites.\n";
    sateliteInformation.innerText += "it has a radius of " + Math.round(satelite.radius) +".\n";
    sateliteInformation.innerText += "dashing through space at a speed of " + satelite.speed +".\n";
    sateliteInformation.innerText += "Orbiting at a distance of " + satelite.distance +".\n";
    sateliteInformation.innerText += "(Note that these values are completely arbitrary and dosn't mean anything)";
}

function HideSatelite()
{
    satelitePanel.style.display = "none";
}