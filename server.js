//  Home Page - "HomePage","/",""
//  Product page - "product"
// "/api" => display data.json to browser
//  error 404 Page not found
var http=require('http')
var fs=require('fs')
var url=require('url')
var template=fs.readFileSync('product.html')
var datajson=fs.readFileSync('data.json')
var card=fs.readFileSync('card.html')
var homePage=fs.readFileSync('homePage.html')
data=JSON.parse(datajson)
template+=""
card+=""
homePage+=""
function replace(template,product){
    template=template.replace(/{IMAGE}/g,product.image)
    template=template.replace(/{NAME}/g,product.productName)
    template=template.replace(/{COUNTRY}/g,product.from)
    template=template.replace(/{NUTRIENTS}/g,product.nutrients)
    template=template.replace(/{QUANTITY}/g,product.quantity)
    template=template.replace(/{PRICE}/g,product.price)
    template=template.replace(/{DESCRIPTION}/g,product.description)
    template=template.replace(/{URL}/g,`/product?id=${product.id}`)
    if(!product['organic']){
      template=template.replace(/{CLASS}/,'not-organic')
    }
  return template
}
var server =http.createServer(function(req,res){
  res.writeHead(200,{"Content-type":"text/html"})
  var parameters=url.parse(req.url,true)
  var pathname=parameters.pathname
  var id=parameters.query.id
  console.log(parameters)
  if(req.url=="/homepage" || req.url=="/" || req.url==""){
      var emptyString=""
       for(var i=0;i<data.length;i++){
           var oneCard=replace(card,data[i])
           emptyString+=oneCard
       }
        var updatedHomePage=homePage.replace(/{CARDS}/,emptyString)
      res.write(updatedHomePage)
  } else if(pathname=='/product'){
      var mytemplate=replace(template,data[id])
      res.write(mytemplate)
  } else if(req.url=='/api'){
      res.write(datajson)
  }else {
      res.write("ERROR 404")
  }
  res.end()
})
server.listen(3000,function(){
    console.log("server is listening on port 3000")
})