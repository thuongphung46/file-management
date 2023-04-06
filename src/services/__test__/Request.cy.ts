import {HttpClientRequest} from "../Request";

describe("Test Axios", () => {
  let data = HttpClientRequest("ServerService").getAsync("GetById", {id: "1", name: "3232"});
  // it("Can Pass param", () => {
  //   expect(data.then(x => x.request.params)).eq({id: "1", name: "3232"});
  // })


})

export {}
