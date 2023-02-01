import fetch from "node-fetch";

function extractLinks(arrayLinks) {
  return arrayLinks.map((objectLink) => Object.values(objectLink).join());
  //join convert array in String
}

async function checkStatus(listURLs) {
  //promise all receive a list and solve all links, because fetch do 1 by time.
  const arrayStatus = await Promise.all(
    listURLs.map(async (url) => {
      try {
        const response = await fetch(url);
        return `${response.status} - ${response.statusText}`;
      } catch (err) {
        return Error(err);
      }
    })
  );
  return arrayStatus;
}

function Error(err) {
  if (err === "ENOTFOUND") {
    return "link não encontrado";
  } else {
    return "ocorreu algum erro";
  }
}

export default async function validatedList(list) {
  const links = extractLinks(list);
  const status = await checkStatus(links);

  return list.map((object, index) => ({
    ...object,
    status: status[index],
  }));
}
