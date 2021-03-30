export const determineAnyObjectPropsHasVal = (object) => 
{
    let aPropHasVal = false;

    for (const key in object) 
    {
        if (object[key])
        {
            aPropHasVal = true;
        }
    }

    return aPropHasVal;
}