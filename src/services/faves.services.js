import { BehaviorSubject } from 'rxjs';

const favesSubject = new BehaviorSubject([]);

export const favService = {
    setFaves,
    getFaves,
    favesSubject: favesSubject.asObservable(),
    get faves () { return favesSubject.value }
}

function setFaves(storyId)
{
    return new Promise((resolve, reject) => {
        try
        {
            
            let faves = localStorage.getItem('Faves') ? JSON.parse(localStorage.getItem('Faves')) : []
            console.log("Faves", faves)
            faves.push(storyId)
            localStorage.setItem('Faves', JSON.stringify(faves))
            favesSubject.next(faves)
            //localStorage.removeItem("Faves")
            resolve()
        }
        catch(err)
        {
            reject(err)
        }
    })
}

function getFaves()
{
    let faves = localStorage.getItem('Faves')
    console.log("Getting faves", faves)
    if(faves)
    {
        favesSubject.next(faves)
    }
    else
    {
        favesSubject.next([])
    }
}
