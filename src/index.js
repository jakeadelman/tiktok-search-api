async function fetchTikTokSearch(keyword, ttwid, cookies) {
  return new Promise(async (resolve) => {
    let cookieString = ttwid == null ? cookies : "ttwid=" + ttwid + ";";
    let urlString = `https://www.tiktok.com/api/search/general/full/?`;
    let ops = [
      { name: "from_page", val: "search" },
      { name: "keyword", val: keyword },
    ];

    for (let b = 0; b < ops.length; b++) {
      urlString = urlString + ops[b].name + "=" + ops[b].val + "&";
    }
    try {
      fetch(urlString, {
        method: "GET",
        headers: {
          Cookie: cookieString,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          resolve(data.data);
        });
    } catch (err) {
      console.log(err);
    }
  });
}
async function fetchTikTokSearch2(keyword, offset, searchId, ttwid, cookies) {
  return new Promise(async (resolve) => {
    let cookieString = ttwid == null ? cookies : "ttwid=" + ttwid + ";";
    let urlString = `https://www.tiktok.com/api/search/general/full/?`;
    let ops = [
      { name: "from_page", val: "search" },
      { name: "keyword", val: keyword },
      { name: "offset", val: offset },
      { name: "search_id", val: searchId },
    ];

    for (let b = 0; b < ops.length; b++) {
      urlString = urlString + ops[b].name + "=" + ops[b].val + "&";
    }

    try {
      fetch(urlString, {
        method: "GET",
        headers: {
          Cookie: cookieString,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          resolve(data.data);
        });
    } catch (err) {
      console.log(err);
    }
  });
}
async function TikTokSearch(keyword, ttwid, pages, cookies) {
  return new Promise(async (resolve) => {
    let search1 = await fetchTikTokSearch(keyword, ttwid, cookies);
    if (search1 && search1.length > 0) {
      let searchId = search1[0].common.doc_id_str;
      let finalArr = [];
      for (let i = 1; i < pages; i++) {
        let iPlus = i + 1;
        let myArr = await fetchTikTokSearch2(
          keyword,
          iPlus * 12,
          searchId,
          ttwid,
          cookies
        );
        myArr?.map((arrItem) => {
          finalArr.push(arrItem);
        });
        if (i == pages - 1) {
          resolve(finalArr);
        }
      }
    } else {
      resolve([]);
    }
  });
}

module.exports = { TikTokSearch };
