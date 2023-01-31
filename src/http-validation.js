function extractLinks(arrayLinks){
     return arrayLinks.map((objectLink) => Object.values(objectLink).join())
     //join convert array in String
}
export default function validatedList (list){
    return extractLinks(list);
}