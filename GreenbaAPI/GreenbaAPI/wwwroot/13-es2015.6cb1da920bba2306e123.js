(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"6ANv":function(t,e,c){"use strict";c.r(e),c.d(e,"ShopModule",(function(){return x}));var n=c("SVse"),i=c("PCNd"),o=c("iInd"),s=c("XJHN"),r=c("8Y7J"),a=c("mwRl"),p=c("/gyc"),b=c("s7LF"),u=c("cAP4"),l=c("TSSN");let d=(()=>{class t{constructor(t){this.basketService=t}ngOnInit(){}addItemToBasket(){this.basketService.addItemToBasket(this.product)}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(u.a))},t.\u0275cmp=r.Jb({type:t,selectors:[["app-product-item"]],inputs:{product:"product"},decls:15,vars:11,consts:[[1,"card","h-100","shadow-sm"],[1,"image","position-relative",2,"cursor","pointer"],[1,"img-fluid","bg-info",3,"src","alt"],[1,"d-flex","align-items-center","justify-content-center","hover-overlay"],["type","button",1,"btn","btn-primary","fa","fa-shopping-cart","mr-2",3,"click"],["type","button",1,"btn","btn-primary",3,"routerLink"],[1,"card-body","d-flex","flex-column"],[3,"routerLink"],[1,"text-uppercase"],[1,"mb-2"]],template:function(t,e){1&t&&(r.Vb(0,"div",0),r.Vb(1,"div",1),r.Qb(2,"img",2),r.Vb(3,"div",3),r.Vb(4,"button",4),r.dc("click",(function(){return e.addItemToBasket()})),r.Ub(),r.Vb(5,"button",5),r.Jc(6),r.hc(7,"translate"),r.Ub(),r.Ub(),r.Ub(),r.Vb(8,"div",6),r.Vb(9,"a",7),r.Vb(10,"h6",8),r.Jc(11),r.Ub(),r.Ub(),r.Vb(12,"span",9),r.Jc(13),r.hc(14,"currency"),r.Ub(),r.Ub(),r.Ub()),2&t&&(r.Bb(2),r.oc("src",e.product.pictureUrl,r.Cc),r.oc("alt",e.product.name),r.Bb(3),r.pc("routerLink","/shop/",e.product.id,""),r.Bb(1),r.Kc(r.ic(7,7,"shop.product-item.viewButton")),r.Bb(3),r.pc("routerLink","/shop/",e.product.id,""),r.Bb(2),r.Kc(e.product.name),r.Bb(2),r.Kc(r.ic(14,9,e.product.price)))},directives:[o.d,o.f],pipes:[l.c,n.d],styles:[".btn[_ngcontent-%COMP%]{width:30%;height:40px}.image[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover{opacity:1}.image[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover   button[_ngcontent-%COMP%]{transform:none;opacity:1}.hover-overlay[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%;top:0;left:0;background:hsla(0,0%,100%,.5);opacity:0;transition:all .5s}.hover-overlay[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{z-index:1000;transition:all .5s}.hover-overlay[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:first-of-type{transform:translateX(-20px)}.hover-overlay[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-of-type{transform:translateX(20px)}"]}),t})();var h=c("a4eG");const g=["search"];function m(t,e){if(1&t&&(r.Vb(0,"option",16),r.Jc(1),r.Ub()),2&t){const t=e.$implicit,c=r.gc(2);r.nc("selected",c.shopParams.sort===t.value)("value",t.value),r.Bb(1),r.Kc(t.name)}}function f(t,e){if(1&t){const t=r.Wb();r.Vb(0,"li",17),r.dc("click",(function(){r.Ac(t);const c=e.$implicit;return r.gc(2).onBrandSelected(c.id)})),r.Jc(1),r.Ub()}if(2&t){const t=e.$implicit,c=r.gc(2);r.Gb("active",t.id===c.shopParams.brandId),r.nc("value",t.id),r.Bb(1),r.Lc(" ",t.name," ")}}function v(t,e){if(1&t){const t=r.Wb();r.Vb(0,"li",17),r.dc("click",(function(){r.Ac(t);const c=e.$implicit;return r.gc(2).onTypeSelected(c.id)})),r.Jc(1),r.Ub()}if(2&t){const t=e.$implicit,c=r.gc(2);r.Gb("active",t.id===c.shopParams.typeId),r.nc("value",t.id),r.Bb(1),r.Lc(" ",t.name," ")}}function y(t,e){if(1&t){const t=r.Wb();r.Tb(0),r.Vb(1,"h5",10),r.Jc(2,"Ordenar"),r.Ub(),r.Vb(3,"select",11),r.dc("change",(function(e){return r.Ac(t),r.gc().onSortSelected(e.target.value)})),r.Hc(4,m,2,3,"option",12),r.Ub(),r.Vb(5,"h5",13),r.Jc(6,"Marcas"),r.Ub(),r.Vb(7,"ul",14),r.Hc(8,f,2,4,"li",15),r.Ub(),r.Vb(9,"h5",13),r.Jc(10,"Categorias"),r.Ub(),r.Vb(11,"ul",14),r.Hc(12,v,2,4,"li",15),r.Ub(),r.Sb()}if(2&t){const t=r.gc();r.Bb(4),r.nc("ngForOf",t.sortOptions),r.Bb(4),r.nc("ngForOf",t.brands),r.Bb(4),r.nc("ngForOf",t.types)}}function P(t,e){if(1&t){const t=r.Wb();r.Vb(0,"div",18),r.Vb(1,"input",19,20),r.dc("keyup.enter",(function(){return r.Ac(t),r.gc().onSearch()})),r.Ub(),r.Vb(3,"button",21),r.dc("click",(function(){return r.Ac(t),r.gc().onSearch()})),r.Jc(4),r.hc(5,"translate"),r.Ub(),r.Vb(6,"button",22),r.dc("click",(function(){return r.Ac(t),r.gc().onReset()})),r.Jc(7),r.hc(8,"translate"),r.Ub(),r.Ub()}2&t&&(r.Bb(4),r.Lc(" ",r.ic(5,2,"shop.searchButton")," "),r.Bb(3),r.Lc(" ",r.ic(8,4,"shop.deleteButton")," "))}function S(t,e){if(1&t&&(r.Vb(0,"div",23),r.Qb(1,"app-product-item",24),r.Ub()),2&t){const t=e.$implicit;r.Bb(1),r.nc("product",t)}}function U(t,e){if(1&t){const t=r.Wb();r.Vb(0,"div",25),r.Vb(1,"app-pager",26),r.dc("pageChanged",(function(e){return r.Ac(t),r.gc().onPageChanged(e)})),r.Ub(),r.Ub()}if(2&t){const t=r.gc();r.Bb(1),r.nc("pageSize",t.shopParams.pageSize)("totalCount",t.totalCount)("pageNumber",t.shopParams.pageNumber)}}let V=(()=>{class t{constructor(t){this.shopService=t,this.sortOptions=[{name:"Alfabetico",value:"name"},{name:"Precio: Bajo a alto",value:"priceAsc"},{name:"Precio: Alto a bajo",value:"priceDesc"}],this.shopParams=this.shopService.getShopParams()}ngOnInit(){this.getProducts(!0),this.getBrands(),this.getTypes()}getProducts(t=!1){this.shopService.getProducts(t).subscribe(t=>{this.products=t.data,this.totalCount=t.count},t=>{console.log(t)})}getBrands(){this.shopService.getBrands().subscribe(t=>{this.brands=[{id:0,name:"Todas"},...t]},t=>{console.log(t)})}getTypes(){this.shopService.getTypes().subscribe(t=>{this.types=[{id:0,name:"Todas"},...t]},t=>{console.log(t)})}onBrandSelected(t){const e=this.shopService.getShopParams();e.brandId=t,e.pageNumber=1,this.shopService.setShopParams(e),this.getProducts()}onTypeSelected(t){const e=this.shopService.getShopParams();e.typeId=t,e.pageNumber=1,this.shopService.setShopParams(e),this.getProducts()}onSortSelected(t){const e=this.shopService.getShopParams();e.sort=t,this.shopService.setShopParams(e),this.getProducts()}onPageChanged(t){const e=this.shopService.getShopParams();e.pageNumber!==t&&(e.pageNumber=t,this.shopService.setShopParams(e),this.getProducts(!0))}onSearch(){const t=this.shopService.getShopParams();t.search=this.searchTerm.nativeElement.value,t.pageNumber=1,this.shopService.setShopParams(t),this.getProducts()}onReset(){this.searchTerm.nativeElement.value="",this.shopParams=new s.a,this.shopService.setShopParams(this.shopParams),this.getProducts()}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(a.a))},t.\u0275cmp=r.Jb({type:t,selectors:[["app-shop"]],viewQuery:function(t,e){var c;1&t&&r.Oc(g,!0),2&t&&r.wc(c=r.ec())&&(e.searchTerm=c.first)},decls:11,vars:7,consts:[[1,"container","mt-3"],[1,"row"],[1,"col-3"],[4,"ngIf"],[1,"col-9"],[1,"d-flex","justify-content-between","align-items-center","pb-2"],[3,"totalCount","pageSize","pageNumber"],["class","form-inline",4,"ngIf"],["class","col-4 mb-4",4,"ngFor","ngForOf"],["class","d-flex justify-content-center",4,"ngIf"],[1,"text-warning","ml-3","mt-4","mb-3"],[1,"custom-select","mb-3","mb-4",3,"change"],[3,"selected","value",4,"ngFor","ngForOf"],[1,"text-warning","ml-3"],[1,"list-group","my-3"],["class","list-group-item",3,"active","value","click",4,"ngFor","ngForOf"],[3,"selected","value"],[1,"list-group-item",3,"value","click"],[1,"form-inline"],["placeholder","Buscar","type","text",1,"form-control","mr-2",2,"width","300px",3,"keyup.enter"],["search",""],[1,"btn","btn-outline-primary","my-2",3,"click"],[1,"btn","btn-outline-success","ml-2","my-2",3,"click"],[1,"col-4","mb-4"],[3,"product"],[1,"d-flex","justify-content-center"],[3,"pageSize","totalCount","pageNumber","pageChanged"]],template:function(t,e){1&t&&(r.Vb(0,"div",0),r.Vb(1,"div",1),r.Vb(2,"section",2),r.Hc(3,y,13,3,"ng-container",3),r.Ub(),r.Vb(4,"section",4),r.Vb(5,"div",5),r.Qb(6,"app-paging-header",6),r.Hc(7,P,9,6,"div",7),r.Ub(),r.Vb(8,"div",1),r.Hc(9,S,2,1,"div",8),r.Ub(),r.Hc(10,U,2,3,"div",9),r.Ub(),r.Ub(),r.Ub()),2&t&&(r.Bb(3),r.nc("ngIf",e.types&&e.brands),r.Bb(3),r.nc("totalCount",e.totalCount)("pageSize",e.shopParams.pageSize)("pageNumber",e.shopParams.pageNumber),r.Bb(1),r.nc("ngIf",e.products),r.Bb(2),r.nc("ngForOf",e.products),r.Bb(1),r.nc("ngIf",e.totalCount>0))},directives:[n.m,p.a,n.l,b.o,b.s,d,h.a],pipes:[l.c],styles:[".list-group-item[_ngcontent-%COMP%]{cursor:pointer;border:none;padding:10px 20px;font-size:1.1em}.list-group-item[_ngcontent-%COMP%]:focus{outline:none}.list-group-item.active[_ngcontent-%COMP%]{border-radius:10px}.list-group-item[_ngcontent-%COMP%]:not(.active):hover{color:#fff;background-color:rgba(233,86,32,.705);border-radius:10px}"]}),t})();var B=c("sJwy"),k=c("GlbF");function C(t,e){if(1&t){const t=r.Wb();r.Vb(0,"div",2),r.Vb(1,"div",3),r.Qb(2,"ngx-gallery",4),r.Ub(),r.Vb(3,"div",3),r.Vb(4,"h3"),r.Jc(5),r.Ub(),r.Vb(6,"p",5),r.Jc(7),r.hc(8,"currency"),r.Ub(),r.Vb(9,"div",6),r.Vb(10,"i",7),r.dc("click",(function(){return r.Ac(t),r.gc().decrementQuantity()})),r.Ub(),r.Vb(11,"span",8),r.Jc(12),r.Ub(),r.Vb(13,"i",9),r.dc("click",(function(){return r.Ac(t),r.gc().incrementQuantity()})),r.Ub(),r.Vb(14,"button",10),r.dc("click",(function(){return r.Ac(t),r.gc().addItemToBasket()})),r.Jc(15),r.hc(16,"translate"),r.Ub(),r.Ub(),r.Ub(),r.Vb(17,"div",11),r.Vb(18,"div",12),r.Vb(19,"h4"),r.Jc(20),r.hc(21,"translate"),r.Ub(),r.Vb(22,"p"),r.Jc(23),r.Ub(),r.Ub(),r.Ub(),r.Ub()}if(2&t){const t=r.gc();r.Bb(2),r.nc("options",t.galleryOptions)("images",t.galleryImages),r.Bb(3),r.Kc(t.product.name),r.Bb(2),r.Kc(r.ic(8,8,t.product.price)),r.Bb(5),r.Kc(t.quantity),r.Bb(3),r.Kc(r.ic(16,10,"shop.product-details.addToCartButton")),r.Bb(5),r.Kc(r.ic(21,12,"shop.product-details.productDescription")),r.Bb(3),r.Kc(t.product.description)}}const w=[{path:"",component:V},{path:":id",component:(()=>{class t{constructor(t,e,c,n){this.shopService=t,this.activatedRoute=e,this.bcService=c,this.basketService=n,this.quantity=1,c.set("@productDetails","")}ngOnInit(){this.loadProduct()}initializeGallery(){this.galleryOptions=[{width:"500px",height:"600px",imagePercent:100,thumbnailsColumns:4,imageAnimation:B.a.Fade,imageSize:B.c.Contain,thumbnailSize:B.c.Contain,preview:!1}],this.galleryImages=this.getImages()}getImages(){const t=[];for(const e of this.product.photos)t.push({small:e.pictureUrl,medium:e.pictureUrl,big:e.pictureUrl});return t}addItemToBasket(){this.basketService.addItemToBasket(this.product,this.quantity)}incrementQuantity(){this.quantity++}decrementQuantity(){this.quantity>1&&this.quantity--}loadProduct(){this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe(t=>{this.product=t,this.bcService.set("@productDetails",t.name),this.initializeGallery()},t=>console.log(t))}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(a.a),r.Pb(o.a),r.Pb(k.c),r.Pb(u.a))},t.\u0275cmp=r.Jb({type:t,selectors:[["app-product-details"]],decls:2,vars:1,consts:[[1,"container","mt-5"],["class","row",4,"ngIf"],[1,"row"],[1,"col-6"],[2,"display","inline-block","margin-bottom","20px",3,"options","images"],[2,"font-size","2em"],[1,"d-flex","justify-content-start","align-items-center"],[1,"fa","fa-minus-circle","text-warning","mr-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"font-weight-bold",2,"font-size","1.5em"],[1,"fa","fa-plus-circle","text-warning","mx-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"btn","btn-outline-primary","btn-lg","ml-4",3,"click"],[1,"row","mt-5"],[1,"col-12","ml-3"]],template:function(t,e){1&t&&(r.Vb(0,"div",0),r.Hc(1,C,24,14,"div",1),r.Ub()),2&t&&(r.Bb(1),r.nc("ngIf",e.product))},directives:[n.m,B.b],pipes:[n.d,l.c],styles:[""]}),t})(),data:{breadcrumb:{alias:"productDetails"}}}];let O=(()=>{class t{}return t.\u0275mod=r.Nb({type:t}),t.\u0275inj=r.Mb({factory:function(e){return new(e||t)},imports:[[o.g.forChild(w)],o.g]}),t})(),x=(()=>{class t{}return t.\u0275mod=r.Nb({type:t}),t.\u0275inj=r.Mb({factory:function(e){return new(e||t)},imports:[[n.c,i.a,O,l.b]]}),t})()}}]);