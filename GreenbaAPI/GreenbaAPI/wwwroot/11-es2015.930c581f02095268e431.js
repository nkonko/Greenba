(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{h9W5:function(e,r,t){"use strict";t.r(r),t.d(r,"OrdersModule",(function(){return O}));var o=t("SVse"),a=t("iInd"),s=t("s7LF"),i=t("8Y7J"),n=t("giQ8"),c=t("VfTn"),d=t("a4eG");function b(e,r){if(1&e&&(i.Vb(0,"option",17),i.Jc(1),i.Ub()),2&e){const e=r.$implicit,t=i.gc();i.nc("selected",t.orderParams.sort===e.value)("value",e.value),i.Bb(1),i.Kc(e.name)}}function l(e,r){if(1&e&&(i.Vb(0,"option",17),i.Jc(1),i.Ub()),2&e){const e=r.$implicit,t=i.gc();i.nc("selected",t.orderParams.sort===e.value)("value",e.value),i.Bb(1),i.Kc(e.name)}}function u(e,r){if(1&e&&(i.Vb(0,"tr",18),i.Vb(1,"th"),i.Jc(2),i.Ub(),i.Vb(3,"td"),i.Jc(4),i.hc(5,"date"),i.Ub(),i.Vb(6,"td"),i.Jc(7),i.hc(8,"currency"),i.Ub(),i.Vb(9,"td"),i.Jc(10),i.Ub(),i.Ub()),2&e){const e=r.$implicit;i.pc("routerLink","/orders/",e.id,""),i.Bb(2),i.Lc("# ",e.id,""),i.Bb(2),i.Kc(i.jc(5,5,e.orderDate,"medium")),i.Bb(3),i.Kc(i.ic(8,8,e.total)),i.Bb(3),i.Kc(e.status)}}let m=(()=>{class e{constructor(e,r){this.ordersService=e,this.fb=r,this.timeOptions=[{name:"Mas nuevas",value:"Newest"},{name:"Mas viejas",value:"Oldest"}],this.statusOptions=[{name:"Pendiente",value:"pending"},{name:"Entregado",value:"delivered"},{name:"Cancelado",value:"canceled"}],this.orderParams=this.ordersService.getOrderParams()}ngOnInit(){this.getOrders(),this.createForm()}getOrders(){this.ordersService.getOrdersByParams().subscribe(e=>{this.orders=e.data,this.totalCount=e.count},e=>{console.log(e)})}onSortSelected(e){const r=this.ordersService.getOrderParams();r.sort=e,this.ordersService.setOrderParams(r),this.getOrders()}onPageChanged(e){const r=this.ordersService.getOrderParams();r.pageNumber!==e&&(r.pageNumber=e,this.ordersService.getOrderParams(),this.getOrders())}createForm(){this.orderForm=this.fb.group({dateFrom:[null,s.r.required],dateTo:[null,s.r.required]})}onStatusSelected(e){const r=this.ordersService.getOrderParams();r.state=e,this.ordersService.setOrderParams(r),this.getOrders()}filter(){if(this.orderForm.controls.dateFrom.value||this.orderForm.controls.dateTo.value){const e=this.ordersService.getOrderParams();e.dateFrom=this.orderForm.controls.dateFrom.value,e.dateTo=this.orderForm.controls.dateTo.value,this.ordersService.setOrderParams(e),this.ordersService.getOrdersByParams().subscribe(e=>{this.orders=e.data,this.totalCount=e.count},e=>{console.log(e)})}}}return e.\u0275fac=function(r){return new(r||e)(i.Pb(n.a),i.Pb(s.b))},e.\u0275cmp=i.Jb({type:e,selectors:[["app-orders"]],decls:40,vars:7,consts:[[1,"container","mt-5"],[1,"row","align-items-start"],[1,"col-3"],[1,"text-warning"],[1,"custom-select","mb-3","mb-4",3,"change"],[3,"selected","value",4,"ngFor","ngForOf"],[1,"col-3","mb-3"],[3,"formGroup"],["formControlName","dateFrom","placeholder","Desde",3,"ngModelChange"],["formControlName","dateTo","placeholder","Hasta",3,"ngModelChange"],[1,"row"],[1,"col-12"],[1,"table","table-hover",2,"cursor","pointer"],[1,"thead-light"],[3,"routerLink",4,"ngFor","ngForOf"],[1,"d-flex","justify-content-center"],[3,"pageSize","totalCount","pageNumber","pageChanged"],[3,"selected","value"],[3,"routerLink"]],template:function(e,r){1&e&&(i.Vb(0,"div",0),i.Vb(1,"div",1),i.Vb(2,"div",2),i.Vb(3,"div"),i.Vb(4,"h4",3),i.Jc(5,"Antig\xfcedad"),i.Ub(),i.Vb(6,"select",4),i.dc("change",(function(e){return r.onSortSelected(e.target.value)})),i.Hc(7,b,2,3,"option",5),i.Ub(),i.Ub(),i.Ub(),i.Vb(8,"div",6),i.Vb(9,"form",7),i.Vb(10,"h4",3),i.Jc(11,"Fecha desde:"),i.Ub(),i.Vb(12,"app-datepicker",8),i.dc("ngModelChange",(function(){return r.filter()})),i.Ub(),i.Qb(13,"br"),i.Vb(14,"h4",3),i.Jc(15,"Fecha hasta:"),i.Ub(),i.Vb(16,"app-datepicker",9),i.dc("ngModelChange",(function(){return r.filter()})),i.Ub(),i.Ub(),i.Ub(),i.Vb(17,"div",6),i.Vb(18,"div"),i.Vb(19,"h4",3),i.Jc(20,"Estado"),i.Ub(),i.Vb(21,"select",4),i.dc("change",(function(e){return r.onStatusSelected(e.target.value)})),i.Hc(22,l,2,3,"option",5),i.Ub(),i.Ub(),i.Ub(),i.Ub(),i.Vb(23,"div",10),i.Vb(24,"div",11),i.Vb(25,"table",12),i.Vb(26,"thead",13),i.Vb(27,"tr"),i.Vb(28,"th"),i.Jc(29,"Orden"),i.Ub(),i.Vb(30,"th"),i.Jc(31,"Fecha"),i.Ub(),i.Vb(32,"th"),i.Jc(33,"Total"),i.Ub(),i.Vb(34,"th"),i.Jc(35,"Estado"),i.Ub(),i.Ub(),i.Ub(),i.Vb(36,"tbody"),i.Hc(37,u,11,10,"tr",14),i.Ub(),i.Ub(),i.Vb(38,"div",15),i.Vb(39,"app-pager",16),i.dc("pageChanged",(function(e){return r.onPageChanged(e)})),i.Ub(),i.Ub(),i.Ub(),i.Ub(),i.Ub()),2&e&&(i.Bb(7),i.nc("ngForOf",r.timeOptions),i.Bb(2),i.nc("formGroup",r.orderForm),i.Bb(13),i.nc("ngForOf",r.statusOptions),i.Bb(15),i.nc("ngForOf",r.orders),i.Bb(2),i.nc("pageSize",r.orderParams.pageSize)("totalCount",r.totalCount)("pageNumber",r.orderParams.pageNumber))},directives:[o.l,s.t,s.m,s.f,c.a,s.l,s.d,d.a,s.o,s.s,a.d],pipes:[o.f,o.d],styles:[""]}),e})();var h=t("GlbF"),p=t("GJcC"),g=t("PoZw");function v(e,r){if(1&e&&(i.Vb(0,"div",2),i.Vb(1,"div",3),i.Qb(2,"app-basket-summary",4),i.Ub(),i.Vb(3,"div",5),i.Qb(4,"app-order-totals",6),i.Ub(),i.Ub()),2&e){const e=i.gc();i.Bb(2),i.nc("items",e.order.orderItems)("isBasket",!1)("isOrder",!0),i.Bb(2),i.nc("shippingPrice",e.order.shippingPrice)("subtotal",e.order.subTotal)("total",e.order.total)}}const f=[{path:"",component:m},{path:":id",component:(()=>{class e{constructor(e,r,t){this.route=e,this.breadcrumbService=r,this.ordersService=t,this.breadcrumbService.set("@OrderDetailed","")}ngOnInit(){this.ordersService.getOrderDetailed(+this.route.snapshot.paramMap.get("id")).subscribe(e=>{this.order=e,this.order.subTotal=e.subtotal,this.breadcrumbService.set("@OrderDetailed",`Order# ${e.id} - ${e.status}`)},e=>{console.log(e)})}}return e.\u0275fac=function(r){return new(r||e)(i.Pb(a.a),i.Pb(h.c),i.Pb(n.a))},e.\u0275cmp=i.Jb({type:e,selectors:[["app-order-detailed"]],decls:2,vars:1,consts:[[1,"container","mt-5"],["class","row",4,"ngIf"],[1,"row"],[1,"col-8"],[3,"items","isBasket","isOrder"],[1,"col-4"],[3,"shippingPrice","subtotal","total"]],template:function(e,r){1&e&&(i.Vb(0,"div",0),i.Hc(1,v,5,6,"div",1),i.Ub()),2&e&&(i.Bb(1),i.nc("ngIf",r.order))},directives:[o.m,p.a,g.a],styles:[""]}),e})(),data:{breadcrumb:{alias:"Detalle de orden"}}}];let V=(()=>{class e{}return e.\u0275mod=i.Nb({type:e}),e.\u0275inj=i.Mb({factory:function(r){return new(r||e)},imports:[[a.g.forChild(f)],a.g]}),e})();var U=t("PCNd");let O=(()=>{class e{}return e.\u0275mod=i.Nb({type:e}),e.\u0275inj=i.Mb({factory:function(r){return new(r||e)},imports:[[o.c,V,U.a]]}),e})()}}]);