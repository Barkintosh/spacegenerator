function GetDistance(a, b)
{
    return Math.sqrt((a.x - a.y)*(a.x - a.y) +  (b.x - b.y)*(b.x - b.y));
}

function GetRandomInt(min, max) 
{
    return min + Math.floor(Math.random() * Math.floor(max - min));
}

function GetRandomString(nb) 
{
    var string = "";
    for(i = 0; i < nb; i++)
    {
        string += characters.all.charAt(Math.random() * characters.all.length);
    }
    return string;
}

function GetRandomName()
{
    var string = "";
    var length = 4 + Math.floor(Math.random() * Math.floor(4));
    
    for(i = 0; i < length; i++)
    {
        if(i%2 === 0)
            string += characters.vowel.charAt(Math.random() * characters.vowel.length);
        else
            string += characters.consonnant.charAt(Math.random() * characters.consonnant.length);
    }
    return string[0].toUpperCase() + string.slice(1);
}

function GetRandomColor(minRed, maxRed, minGreen, maxGreen, minBlue, maxBlue)
{
    var string; 

    string = "rgb(" + GetRandomInt(minRed, maxRed) + ", " + GetRandomInt(minGreen, maxGreen) + ", " + GetRandomInt(minBlue, maxBlue) + ")"; 

    return string;
}

function include(filename)
{
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';

    head.appendChild(script)
}

function Lerp(cValue, tValue, speed)
{
    var rValue = cValue;
    if(cValue > tValue && Math.floor(cValue) - Math.floor(cValue) > speed) // If the current value is superior to the target one
    {
        rValue = cValue - (cValue/tValue)*speed;
        if(cValue < tValue) rValue = tValue;
    }
    else if(cValue < tValue && Math.floor(tValue) - Math.floor(cValue) < speed)// If the current value is inferior to the target one
    {
        rValue = cValue + (cValue/tValue)*speed;
        if(cValue > tValue) rValue = tValue;
    }
    return rValue;
}