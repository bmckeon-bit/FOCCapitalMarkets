import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer,
} from "recharts";
import { loadState, saveState, storageMode, subscribeState } from "./storage.js";

const SEED = {"pipeline":[{"id":"p1","name":"Dev Site D","type":"Development","status":"Closed","priority":null,"dateClosed":"2025-10-01","comps":{"baseRent":null,"addlRent":null,"land":2160000.0,"equity":null,"loan":null,"devFee":1281477.0,"dist":639645.9,"promote":null,"exit":3000000.0,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p2","name":"Friends of Phoenix Leases","type":"Lease","status":"Closed","priority":null,"dateClosed":"2026-01-01","comps":{"baseRent":54000.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"Phoenix Building","likelihood":null,"targetClose":null},{"id":"p3","name":"Bridge Loan","type":"Financing","status":"Deal negotiation","priority":1,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":5500000.0,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":50,"targetClose":null},{"id":"p4","name":"Fuse Renewal Releases","type":"Financing","status":"Closed","priority":null,"dateClosed":"2025-12-15","comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":200000.0,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p5","name":"Phoenix Building Lease","type":"Lease","status":"Not started","priority":3,"dateClosed":null,"comps":{"baseRent":5280000.0,"addlRent":1650000.0,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"Phoenix Building","likelihood":null,"targetClose":null},{"id":"p6","name":"Lease Springfield Scoops","type":"Lease","status":"Deal negotiation","priority":2,"dateClosed":null,"comps":{"baseRent":90000.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"Liberty Building","likelihood":50,"targetClose":null},{"id":"p7","name":"Finvarb Retail Sales Brokerage","type":"Other","status":"Deal negotiation","priority":3,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":690000.0},"building":null,"likelihood":50,"targetClose":null},{"id":"p8","name":"PHX JAX Matt Chang Equity","type":"Equity","status":"Closed","priority":null,"dateClosed":"2025-02-01","comps":{"baseRent":null,"addlRent":null,"land":null,"equity":50000.0,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p9","name":"DDH Solar Loan","type":"Financing","status":"Closed","priority":null,"dateClosed":"2025-05-01","comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":251355.14,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p10","name":"Portugal Fund January Equity","type":"Equity","status":"Closed","priority":null,"dateClosed":"2026-01-31","comps":{"baseRent":null,"addlRent":null,"land":null,"equity":1190000.0,"loan":null,"devFee":65450.0,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p11","name":"Schmeikqua Greene","type":"Lease","status":"Closed","priority":null,"dateClosed":"2026-07-08","comps":{"baseRent":7700.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p12","name":"C-PACE at Prop 6","type":"Financing","status":"Closed","priority":null,"dateClosed":"2026-04-06","comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":2950000.0,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p13","name":"Dev Site D Bridge Loan LISC","type":"Financing","status":"Deal negotiation","priority":1,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":1700000.0,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":50,"targetClose":null},{"id":"p14","name":"Kalila Collman Lease","type":"Lease","status":"Closed","priority":null,"dateClosed":"2026-05-05","comps":{"baseRent":8400.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p15","name":"Bunker Building Lease","type":"Lease","status":"Not started","priority":3,"dateClosed":null,"comps":{"baseRent":2675200.0,"addlRent":704000.0,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"Bunker Building","likelihood":null,"targetClose":null},{"id":"p16","name":"Ceviche Lease","type":"Lease","status":"Deal negotiation","priority":1,"dateClosed":null,"comps":{"baseRent":61200.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"Liberty Building","likelihood":50,"targetClose":null},{"id":"p17","name":"Monique Hargrow Legacy Lease","type":"Lease","status":"Closed","priority":null,"dateClosed":"2026-05-28","comps":{"baseRent":3460.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p18","name":"EDC3 Renewal","type":"Lease","status":"Closed","priority":null,"dateClosed":"2026-04-15","comps":{"baseRent":10800.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"2404 Hubbard","likelihood":null,"targetClose":null},{"id":"p19","name":"DDH Gym Space Yakol","type":"Lease","status":"Closed","priority":null,"dateClosed":"2026-04-29","comps":{"baseRent":29000.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":100000.0},"building":null,"likelihood":null,"targetClose":null},{"id":"p20","name":"Lease Coffee Roasters","type":"Lease","status":"Deal negotiation","priority":2,"dateClosed":null,"comps":{"baseRent":61200.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":50,"targetClose":null},{"id":"p21","name":"Portugal Fund December Equity","type":"Equity","status":"Closed","priority":null,"dateClosed":"2025-12-01","comps":{"baseRent":null,"addlRent":null,"land":null,"equity":1190000.0,"loan":null,"devFee":65450.0,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p22","name":"Grassfed Lease","type":"Lease","status":"Closed","priority":null,"dateClosed":"2025-12-19","comps":{"baseRent":2874191.34,"addlRent":637000.0,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p23","name":"InTune Sublease","type":"Lease","status":"Closed","priority":null,"dateClosed":"2025-10-01","comps":{"baseRent":10000.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p24","name":"Phoenix Building Convertible Loan","type":"Financing","status":"Closed","priority":null,"dateClosed":"2025-08-01","comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":874318.0,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"Phoenix Building","likelihood":null,"targetClose":null},{"id":"p25","name":"Yakol Event Space Lease","type":"Lease","status":"Closed","priority":null,"dateClosed":"2025-09-01","comps":{"baseRent":387900.0,"addlRent":229500.0,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p26","name":"HQ II Bridge Loan","type":"Financing","status":"Closed","priority":null,"dateClosed":"2025-06-01","comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":660000.0,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p27","name":"Hera Small Office Sublease","type":"Lease","status":"Closed","priority":null,"dateClosed":"2025-10-01","comps":{"baseRent":20400.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"The Hub","likelihood":null,"targetClose":null},{"id":"p28","name":"Hera Renewal","type":"Lease","status":"Closed","priority":null,"dateClosed":"2025-10-01","comps":{"baseRent":162240.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"The Hub","likelihood":null,"targetClose":null},{"id":"p29","name":"Endeavor Sublease","type":"Lease","status":"Closed","priority":null,"dateClosed":"2026-01-28","comps":{"baseRent":18000.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p30","name":"Bear Equity","type":"Equity","status":"Closed","priority":null,"dateClosed":"2025-12-12","comps":{"baseRent":null,"addlRent":null,"land":null,"equity":100000.0,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p31","name":"Puff N Stuff","type":"Lease","status":"Closed","priority":null,"dateClosed":"2025-09-01","comps":{"baseRent":540000.0,"addlRent":172500.0,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p32","name":"Fuse Construction and Other Releases","type":"Financing","status":"Closed","priority":null,"dateClosed":"2025-04-01","comps":{"baseRent":null,"addlRent":172500.0,"land":null,"equity":null,"loan":602676.0,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p33","name":"Phase 1 First Grant at Emerald","type":"Other","status":"Deal negotiation","priority":1,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":1000000.0,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"Emerald Station","likelihood":50,"targetClose":null},{"id":"p34","name":"Lease Blue Hound Coffee","type":"Lease","status":"Deal negotiation","priority":2,"dateClosed":null,"comps":{"baseRent":61200.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":50,"targetClose":null},{"id":"p35","name":"Lease Darlene - Ashanti Boutique","type":"Lease","status":"Deal negotiation","priority":2,"dateClosed":null,"comps":{"baseRent":61200.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":50,"targetClose":null},{"id":"p36","name":"Greg Carson (Debt)","type":"Financing","status":"Closed","priority":null,"dateClosed":"2026-01-30","comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":250000.0,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p37","name":"Lori Ann and David Santamaria","type":"Equity","status":"Closed","priority":null,"dateClosed":"2026-03-27","comps":{"baseRent":null,"addlRent":null,"land":null,"equity":250000.0,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p38","name":"Krystal Gage (Versatyle Solutions, LLC)","type":"Lease","status":"Closed","priority":null,"dateClosed":"2026-05-08","comps":{"baseRent":4800.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p39","name":"Hera 2 Year Extension","type":"Lease","status":"Deal negotiation","priority":2,"dateClosed":null,"comps":{"baseRent":627000.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"The Hub","likelihood":50,"targetClose":null},{"id":"p40","name":"Matt Hogan","type":"Equity","status":"Deal negotiation","priority":1,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":3000000.0,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":50,"targetClose":null},{"id":"p41","name":"EDC3 2404 Hubbard Warehouse Lease","type":"Lease","status":"Deal negotiation","priority":1,"dateClosed":null,"comps":{"baseRent":228000.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"2404 Hubbard","likelihood":50,"targetClose":null},{"id":"p42","name":"Raven Jackson Legacy Lease","type":"Lease","status":"Closed","priority":null,"dateClosed":"2026-05-26","comps":{"baseRent":6000.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p43","name":"Ebonee Lease","type":"Lease","status":"Closed","priority":null,"dateClosed":"2026-07-06","comps":{"baseRent":6050.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p44","name":"Phoenix Building Sale","type":"Sale","status":"Not started","priority":3,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":5500000.0,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"Phoenix Building","likelihood":null,"targetClose":null},{"id":"p45","name":"Lease Pizza Guy","type":"Lease","status":"Deal negotiation","priority":2,"dateClosed":null,"comps":{"baseRent":61200.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":50,"targetClose":null},{"id":"p46","name":"Lease Damola's African Boutique","type":"Lease","status":"Deal negotiation","priority":2,"dateClosed":null,"comps":{"baseRent":61200.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":50,"targetClose":null},{"id":"p47","name":"Dev Site A&B HUD 221(d)4 Loan","type":"Financing","status":"Not started","priority":4,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":50000000.0,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p48","name":"Dev Sites E&F (Land Contribution)","type":"Development","status":"Not started","priority":4,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":1179675.0,"dist":15912403.0,"promote":4117769.0,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p49","name":"Dev Site A&B (Land Contribution)","type":"Development","status":"Not started","priority":1,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":1179675.0,"dist":15912403.0,"promote":4117769.0,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p50","name":"Dev Site C (Land Contribution)","type":"Development","status":"Not started","priority":2,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":887116.0,"dist":14121374.0,"promote":2328328.0,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p51","name":"Chozen Membership Concept","type":"Other","status":"Not started","priority":2,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":7500000.0},"building":null,"likelihood":null,"targetClose":null},{"id":"p52","name":"PHX JAX Equity TBD","type":"Equity","status":"Not started","priority":1,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":6000000.0,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p53","name":"Amtrak Hialeah","type":"Development","status":"Not started","priority":2,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":5000000.0,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p54","name":"PHX JAX Other Bridge Loan","type":"Financing","status":"Not started","priority":2,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":3000000.0,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p55","name":"Portugal Fund Equity Remaining","type":"Equity","status":"Not started","priority":1,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":2380000.0,"loan":null,"devFee":130900.0,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p56","name":"Bunker Building Sale","type":"Sale","status":"Not started","priority":3,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":2500000.0,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"Bunker Building","likelihood":null,"targetClose":null},{"id":"p57","name":"HQ II Building Sale","type":"Sale","status":"Not started","priority":2,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":2200000.0,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p58","name":"HQ II Construction Loan","type":"Financing","status":"Not started","priority":2,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":1850000.0,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p59","name":"Blue Zones LOI","type":"Other","status":"Deal negotiation","priority":1,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":500000.0},"building":null,"likelihood":50,"targetClose":null},{"id":"p60","name":"Villa Loan","type":"Financing","status":"Not started","priority":4,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":1200000.0,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null},{"id":"p61","name":"Liberty Building Leases","type":"Lease","status":"Not started","priority":1,"dateClosed":null,"comps":{"baseRent":915000.0,"addlRent":228750.0,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"Liberty Building","likelihood":null,"targetClose":null},{"id":"p62","name":"Grant Money - Prop 6 Phase II","type":"Other","status":"Not started","priority":4,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":1000000.0},"building":null,"likelihood":null,"targetClose":null},{"id":"p63","name":"Grant - Phoenix Building","type":"Other","status":"Not started","priority":4,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":1000000.0},"building":"Phoenix Building","likelihood":null,"targetClose":null},{"id":"p64","name":"Grant - Bunker Building","type":"Other","status":"Not started","priority":3,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":1000000.0},"building":"Bunker Building","likelihood":null,"targetClose":null},{"id":"p65","name":"Emerald Station Office Lease","type":"Lease","status":"Not started","priority":1,"dateClosed":null,"comps":{"baseRent":700000.0,"addlRent":210000.0,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"Emerald Station","likelihood":null,"targetClose":null},{"id":"p66","name":"BTR - Adjustments to mortgage, etc.","type":"Other","status":"Not started","priority":2,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":428638.76},"building":null,"likelihood":null,"targetClose":null},{"id":"p67","name":"Emerald Station Leases","type":"Lease","status":"Not started","priority":2,"dateClosed":null,"comps":{"baseRent":300000.0,"addlRent":null,"land":null,"equity":null,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":"Emerald Station","likelihood":null,"targetClose":null},{"id":"p68","name":"Equity at HQ II","type":"Equity","status":"Not started","priority":3,"dateClosed":null,"comps":{"baseRent":null,"addlRent":null,"land":null,"equity":250000.0,"loan":null,"devFee":null,"dist":null,"promote":null,"exit":null,"other":null},"building":null,"likelihood":null,"targetClose":null}],"canvasses":[{"id":"cv-bridge","name":"Bridge Loan (~$5.5M)","lenders":[{"id":"b1","lender":"Forman Capital","contact":"Ben Jacobson ","email":"bjacobson@formancap.com","status":"Passed","notes":null,"priority":null,"stage":"Passed"},{"id":"b2","lender":"3650 REIT","contact":"Michael Fleischer ","email":"mfleischer@3650reit.com","status":"Sent info 5/28","notes":null,"priority":null,"stage":"Contacted"},{"id":"b3","lender":"Hall Structured Finance","contact":null,"email":null,"status":null,"notes":null,"priority":null,"stage":"Prospect"},{"id":"b4","lender":"Sault Group","contact":null,"email":null,"status":"Sent info 5/27","notes":null,"priority":null,"stage":"Contacted"},{"id":"b5","lender":"Concord Summit (Broker)","contact":null,"email":null,"status":"Sent info 5/28, call: loan capped effectively by LTC, but pushing for LTV","notes":null,"priority":null,"stage":"Contacted"},{"id":"b6","lender":"BGI Capital","contact":null,"email":null,"status":null,"notes":null,"priority":null,"stage":"Prospect"},{"id":"b7","lender":"Vaster ","contact":null,"email":null,"status":null,"notes":null,"priority":null,"stage":"Prospect"},{"id":"b8","lender":"Cooper Horowitz","contact":"Ryan Horowitz","email":null,"status":"Info sent 6/8","notes":null,"priority":null,"stage":"Contacted"},{"id":"b9","lender":"Celestial","contact":null,"email":null,"status":"Call on 6/16. Connecting to Hogan Brothers","notes":null,"priority":null,"stage":"Prospect"},{"id":"b10","lender":"Gelt Financial ","contact":null,"email":" Loans@GeltFinancial.com","status":"Passed","notes":null,"priority":null,"stage":"Passed"},{"id":"b11","lender":"Kennedy Funding (Englewood, NJ) ","contact":null,"email":"info@kennedyfunding.com","status":"Not a fit - too much deposit","notes":null,"priority":null,"stage":"Passed"},{"id":"b12","lender":"Bobby Alvarado (Newmark)","contact":null,"email":null,"status":"Sent info 5/28, initial call and feedbakc on 5/27","notes":null,"priority":null,"stage":"Contacted"},{"id":"b13","lender":"Robert Kaplan (Cushman Broker)","contact":null,"email":null,"status":"Sent info 5/28","notes":null,"priority":null,"stage":"Contacted"},{"id":"b14","lender":"Alex Horn (Bridge Invest)","contact":null,"email":null,"status":"Passed, not a fit","notes":null,"priority":null,"stage":"Passed"},{"id":"b15","lender":"IBS Investment Bank","contact":null,"email":null,"status":null,"notes":null,"priority":null,"stage":"Prospect"},{"id":"b16","lender":"Soviero Capital","contact":null,"email":null,"status":null,"notes":null,"priority":null,"stage":"Prospect"},{"id":"b17","lender":"Banyan Capital","contact":null,"email":null,"status":null,"notes":null,"priority":null,"stage":"Prospect"},{"id":"b18","lender":"Brora Capital (Omar Sobhy intro)","contact":null,"email":null,"status":"Passed, environmental and appraisal risk","notes":null,"priority":null,"stage":"Passed"},{"id":"b19","lender":"Omar Sobhy (Ackman Ziff)","contact":null,"email":null,"status":"Working on lender updates","notes":null,"priority":null,"stage":"Prospect"},{"id":"b20","lender":"Vertix Group","contact":null,"email":null,"status":"Updated 6/10/2026","notes":null,"priority":null,"stage":"Prospect"},{"id":"b21","lender":"Leviathan","contact":null,"email":null,"status":"Call on 6/3. Working on initial feedback","notes":null,"priority":null,"stage":"Prospect"},{"id":"b22","lender":"Post Oak Group","contact":null,"email":null,"status":"Call on 6/16/2026. They want a retainer $40k+","notes":null,"priority":null,"stage":"Prospect"}]},{"id":"cv-devd","name":"Dev Site D (LISC track)","lenders":[{"id":"d1","lender":"TRF","contact":null,"email":null,"status":"Due Diligence","notes":"Restricted to land release price | 7-8% | Said they would to 80% LTV on the PSA amount","priority":1,"stage":"Prospect"},{"id":"d2","lender":"LISC","contact":"Caleena","email":null,"status":"Due Diligence","notes":"up to 90% on appraised value | LOI by Monday 4/20","priority":1,"stage":"Prospect"},{"id":"d3","lender":"Enterprise","contact":null,"email":null,"status":"No good","notes":"$1.5-2.0M | 0.07 | 12 months IO plus extensions | Need Blue Sky guaranty","priority":2,"stage":"Passed"},{"id":"d4","lender":"Neighborhood Lending Partners","contact":"Sean West","email":null,"status":"Due Diligence","notes":"0.65 | 0.075 | Hard sell if we can't get the rest of the project","priority":2,"stage":"Prospect"},{"id":"d5","lender":"First American Bank","contact":"Karen Brady","email":null,"status":"Reached out","notes":"up to 50% on appraised value | offered the bunker building too","priority":2,"stage":"Contacted"},{"id":"d6","lender":"FCLF","contact":null,"email":null,"status":"No good","notes":"0.7 | 7-8%","priority":null,"stage":"Passed"},{"id":"d7","lender":"Raymond James","contact":null,"email":null,"status":null,"notes":null,"priority":null,"stage":"Prospect"},{"id":"d8","lender":"Community First","contact":null,"email":null,"status":"Reached out","notes":null,"priority":null,"stage":"Contacted"},{"id":"d9","lender":"Climate First Bank","contact":null,"email":null,"status":"No good","notes":null,"priority":null,"stage":"Passed"},{"id":"d10","lender":"Barwick Bank","contact":"aaron Kleist, barwick bank, 904-347-7477","email":null,"status":"No good","notes":null,"priority":null,"stage":"Passed"},{"id":"d11","lender":"South State Bank","contact":"jerry smith, south state bank, 904-401-1292","email":null,"status":"No good","notes":null,"priority":null,"stage":"Passed"},{"id":"d12","lender":"PC Federal","contact":"cindy hunt, pc federal, 904-627-5343","email":null,"status":"No good","notes":null,"priority":null,"stage":"Passed"},{"id":"d13","lender":"Self-Help Credit Union","contact":null,"email":null,"status":"No good","notes":null,"priority":null,"stage":"Passed"},{"id":"d14","lender":"Fifth Third","contact":null,"email":null,"status":"No good","notes":null,"priority":null,"stage":"Passed"},{"id":"d15","lender":"Coastal Community Capital","contact":null,"email":null,"status":"No good","notes":null,"priority":null,"stage":"Passed"},{"id":"d16","lender":"HOPE Credit Union","contact":null,"email":null,"status":"No good","notes":null,"priority":null,"stage":"Passed"},{"id":"d17","lender":"VyStar","contact":null,"email":null,"status":"No good","notes":null,"priority":null,"stage":"Passed"}]}],"loans":[{"id":"ln1","name":"PHX JAX: QOZB 8 (2315 Hubbard)","borrower":"FOC Fund Manager QOZB, LLC","loanId":null,"lender":"FIRST HORIZON BANK","address":"2315 Hubbard St, Jacksonville, FL, 32206","amount":647000.0,"rateType":null,"rate":0.0649,"termMonths":48.0,"loanType":"Commercial real estate mortgage","startDate":"2023-08-17","maturityDate":"2027-08-17","paymentFreq":"Monthly","balloon":null,"amortization":"Based on a 25-year amortization\u200b","paymentAmount":null,"outstanding":null,"ltvOrig":"Maximum 75% loan-to-value","prepay":"No prepayment penalties","paymentDue":null,"contact":null,"docLink":"Copy of Closing Statement - 2315 Hubbard Street.pdf","notes":"Fees of 0.25% of the loan amount, payable at closing","covenants":[],"futurePayments":[]},{"id":"ln2","name":"PHX JAX: QOZB 7 (2404 Hubbard)","borrower":"FOC JP PROP 7, LLC","loanId":null,"lender":"United Community Bank","address":null,"amount":1200000.0,"rateType":null,"rate":0.061,"termMonths":120.0,"loanType":"Commercial real estate mortgage","startDate":"2023-04-11","maturityDate":"2033-04-11","paymentFreq":"Maturity","balloon":1015000.0,"amortization":"Interest-only payments with balloon payment of principal at maturity","paymentAmount":null,"outstanding":1015000.0,"ltvOrig":null,"prepay":null,"paymentDue":null,"contact":null,"docLink":"FOC JP - Mortgage Summary (2).pdf","notes":null,"covenants":[],"futurePayments":[]},{"id":"ln3","name":"Construction Loan on QOZB 6 (2320 N Liberty & 2336 N Liberty)","borrower":"FOC JP Prop 6, LLC","loanId":"54972-0001","lender":"Local Initiatives Support Corporation","address":"2320 and 2336 N. Liberty Street, Jacksonville, FL 32206","amount":7000000.0,"rateType":"Fixed","rate":0.08,"termMonths":60.0,"loanType":"Construction & Mini-Permanent Loan","startDate":"2023-12-06","maturityDate":"2028-12-06","paymentFreq":"Monthly","balloon":null,"amortization":"Interest-only for the first 24 months, then amortizing over 300 months (25 years)","paymentAmount":null,"outstanding":null,"ltvOrig":null,"prepay":null,"paymentDue":"1st of the month","contact":null,"docLink":"Doc Book - 2320 & 2336 Liberty.pdf","notes":"24 months disbursment period, 24 months intrest-only period, 300 months amortzation period. Closing fee of $70,000","covenants":[],"futurePayments":[{"id":"fp_lib","date":"2025-12-06","amount":null,"note":"Amortization begins (300-mo schedule) after 24-mo IO period"}]},{"id":"ln4","name":"Tony's Member Loan","borrower":"FOC QOF, LLC","loanId":null,"lender":"CHO RE HOLDINGS, LLC","address":null,"amount":1950000.0,"rateType":"Fixed","rate":0.07,"termMonths":12.0,"loanType":"Member loan","startDate":"2022-04-01","maturityDate":"2024-04-01","paymentFreq":null,"balloon":2232555.0,"amortization":null,"paymentAmount":0.0,"outstanding":2232555.0,"ltvOrig":null,"prepay":"No prepayment penalties","paymentDue":null,"contact":null,"docLink":"Copy of JAX Bridge Loan Agreements - signed (1).pdf","notes":null,"covenants":[],"futurePayments":[]},{"id":"ln5","name":"C-PACE Prop 6","borrower":"FOC JP Prop 6, LLC","loanId":null,"lender":null,"address":null,"amount":null,"rateType":null,"rate":null,"termMonths":null,"loanType":null,"startDate":null,"maturityDate":null,"paymentFreq":null,"balloon":null,"amortization":null,"paymentAmount":null,"outstanding":null,"ltvOrig":null,"prepay":null,"paymentDue":null,"contact":null,"docLink":null,"notes":null,"covenants":[],"futurePayments":[]},{"id":"ln6","name":"Phoenix Building Loan","borrower":"Prop 1, LLC","loanId":null,"lender":"Phoenix Building Convertible Note","address":"2302 Market St","amount":2020000.0,"rateType":"Fixed","rate":0.07,"termMonths":15.0,"loanType":"Convertible mortgage","startDate":"2025-08-25","maturityDate":"2026-11-25","paymentFreq":"Accrued","balloon":null,"amortization":null,"paymentAmount":null,"outstanding":2232100.0,"ltvOrig":null,"prepay":null,"paymentDue":null,"contact":null,"docLink":null,"notes":null,"covenants":[],"futurePayments":[]},{"id":"ln7","name":"Fuse Bridge Loan","borrower":"FOC JP PROP 1A, LLC, FOC JP PROP2, LLC, FOC JP PROP 3, LLC, FOC JP PROP\n4, LLC, and FOC JP PROP 5, LLC,","loanId":null,"lender":"Fuse Funding, LLC","address":"2301 N Main St, 2245 N Main St, 0 Hubbard St, 2401 Hubbard St, 2402 Market St, 0 Market St, 2335 Market St, 2303 Market St, 2305 Hubbard St","amount":4000000.0,"rateType":"Variable","rate":0.125,"termMonths":12.0,"loanType":"Commercial mortgage","startDate":"2024-11-19","maturityDate":"2026-05-19","paymentFreq":"Monthly","balloon":null,"amortization":"Interest-only payments with balloon payment of principal at maturity","paymentAmount":null,"outstanding":null,"ltvOrig":null,"prepay":null,"paymentDue":null,"contact":null,"docLink":"SIGNED - FoC Edits Term Sheet - PHX  JAX - 9.24.2024 v2 (1) (1) (1).pdf","notes":null,"covenants":[],"futurePayments":[]},{"id":"ln8","name":"Fuse Bridge Loan Extension","borrower":"FOC JP PROP 1A, LLC, FOC JP PROP2, LLC, FOC JP PROP 3, LLC, FOC JP PROP\n4, LLC, and FOC JP PROP 5, LLC,","loanId":null,"lender":"Fuse Funding, LLC","address":"2301 N Main St, 2245 N Main St, 0 Hubbard St, 2401 Hubbard St, 2402 Market St, 0 Market St, 2335 Market St, 2303 Market St, 2305 Hubbard St","amount":550000.0,"rateType":"Variable","rate":0.125,"termMonths":12.0,"loanType":"Commercial mortgage","startDate":"2024-08-19","maturityDate":"2026-05-19","paymentFreq":"Monthly","balloon":null,"amortization":"Interest-only payments with balloon payment of principal at maturity","paymentAmount":null,"outstanding":null,"ltvOrig":null,"prepay":null,"paymentDue":null,"contact":null,"docLink":"SIGNED - FoC Edits Term Sheet - PHX  JAX - 9.24.2024 v2 (1) (1) (1).pdf","notes":null,"covenants":[],"futurePayments":[]},{"id":"ln9","name":"Design District Holdings","borrower":"Design District Holdings Inc","loanId":80000151895.0,"lender":"City National Bank","address":"224 NORTHEAST 59TH STREET MIAMI FL","amount":4650000.0,"rateType":"Fixed","rate":0.0617,"termMonths":120.0,"loanType":"Mortgage","startDate":"2022-12-27","maturityDate":"2032-12-27","paymentFreq":"Monthly","balloon":0.0,"amortization":"Principal+interest","paymentAmount":30702.67,"outstanding":4631102.87,"ltvOrig":null,"prepay":null,"paymentDue":null,"contact":null,"docLink":"Loan statement DDH","notes":null,"covenants":[],"futurePayments":[]},{"id":"ln10","name":"Chozen Seller Financing from Kashi","borrower":"Chozen Land, LLC","loanId":null,"lender":"Kashi Church Foundation, Inc.","address":null,"amount":800000.0,"rateType":"Fixed","rate":0.05,"termMonths":60.0,"loanType":"Seller financing","startDate":"2023-07-01","maturityDate":"2028-07-01","paymentFreq":"Monthly","balloon":800000.0,"amortization":"Interest-only payments with balloon payment of principal at maturity","paymentAmount":7500.0,"outstanding":null,"ltvOrig":null,"prepay":"No prepayment penalties","paymentDue":null,"contact":null,"docLink":"Promissory Note.pdf","notes":null,"covenants":[],"futurePayments":[]},{"id":"ln11","name":"Chozen Seller Financing from Kashi","borrower":"Chozen Land, LLC","loanId":null,"lender":"Kashi Church Foundation, Inc.","address":null,"amount":1000000.0,"rateType":"Fixed","rate":0.05,"termMonths":120.0,"loanType":"Seller financing","startDate":"2028-08-01","maturityDate":"2038-07-01","paymentFreq":"Monthly","balloon":0.0,"amortization":"Principal+interest","paymentAmount":10606.55,"outstanding":null,"ltvOrig":null,"prepay":"No prepayment penalties","paymentDue":null,"contact":null,"docLink":"Mortgage.pdf","notes":null,"covenants":[],"futurePayments":[]},{"id":"ln12","name":"Tony's house Chozen","borrower":"Chozen Retreat, LLC","loanId":240603000.0,"lender":"Eastern Financial Mortgage Corporation","address":"10895 Roseland Road, Sebastian, Indian River County, Florida 32958","amount":1000000.0,"rateType":null,"rate":0.11,"termMonths":36.0,"loanType":"Conventional","startDate":"2024-06-01","maturityDate":"2027-06-01","paymentFreq":"Monthly","balloon":1000000.0,"amortization":"Monthly interest only + ballon payment","paymentAmount":9166.67,"outstanding":1000000.0,"ltvOrig":"loan/appraised property value*100","prepay":"No prepayment penalties","paymentDue":"1st of the month","contact":null,"docLink":"1-EFMC Term Sheet - Chozen Retreat.docx.pdf","notes":null,"covenants":[],"futurePayments":[]},{"id":"ln13","name":"Chozen Air LLC","borrower":"Chozen Air LLC","loanId":13550000697.0,"lender":"Bank OZK","address":null,"amount":null,"rateType":null,"rate":0.055,"termMonths":null,"loanType":null,"startDate":null,"maturityDate":null,"paymentFreq":"Monthly","balloon":null,"amortization":null,"paymentAmount":16562.89,"outstanding":1253359.15,"ltvOrig":null,"prepay":"No prepayment penalties","paymentDue":null,"contact":null,"docLink":"13550000697 - CHOZEN AIR LLC - 11-18-2024 INVOICE.pdf","notes":null,"covenants":[],"futurePayments":[]},{"id":"ln14","name":"Tony's Line of Credit on his Condo","borrower":null,"loanId":null,"lender":null,"address":null,"amount":null,"rateType":null,"rate":null,"termMonths":null,"loanType":null,"startDate":null,"maturityDate":null,"paymentFreq":null,"balloon":null,"amortization":null,"paymentAmount":null,"outstanding":null,"ltvOrig":null,"prepay":null,"paymentDue":null,"contact":null,"docLink":null,"notes":null,"covenants":[],"futurePayments":[]},{"id":"ln15","name":"Solar DDH","borrower":"Metro 1 Commercial QOZB, LLC","loanId":40000768.0,"lender":"Climate First Bank","address":"224 NE 59th Street, Miami FL","amount":251355.14,"rateType":"Fixed","rate":0.0899,"termMonths":240.0,"loanType":"Solar Financing","startDate":"2025-05-08","maturityDate":"2045-11-08","paymentFreq":"Monthly","balloon":null,"amortization":"Principal+interest","paymentAmount":2129.87,"outstanding":null,"ltvOrig":null,"prepay":"No prepayment penalties","paymentDue":null,"contact":null,"docLink":"METRO 1 - DRAFTS (1).pdf","notes":null,"covenants":[],"futurePayments":[]},{"id":"ln16","name":"HQII","borrower":"HQ II QOZB LLC","loanId":null,"lender":"Eastern Financial Mortgage Corporation","address":"248-258 NE 59th Street, Miami, FL 33137","amount":660000.0,"rateType":"Fixed","rate":0.1125,"termMonths":23.0,"loanType":"Mortgage","startDate":"2025-07-01","maturityDate":"2027-06-01","paymentFreq":"Monthly","balloon":660000.0,"amortization":"Interest-only (23)","paymentAmount":6187.5,"outstanding":null,"ltvOrig":null,"prepay":"No prepayment penalties","paymentDue":"1st of the month","contact":null,"docLink":"CCF_001336.pdf","notes":null,"covenants":[],"futurePayments":[]}]};

const STORAGE_KEY = "foc_capmarkets_dashboard_v2";
const TARGET_DEFAULT = 50000000;
const Q_DAYS = 365.25 / 4;

/* FOC Brand — Guidelines v1.00 */
const C = {
  text: "#292B41", void_: "#FFFFFF", deep: "#F7F8FA", mid: "#EEF0F4",
  teal: "#A6DCCD", tealDim: "#8BC9B8", tealDeep: "#3E7E6C",
  purple: "#8B7BA8", purpleSoft: "#EDEAF3",
  textDim: "#5A5D78", border: "rgba(139,123,168,0.15)",
  navy2: "#3A3660", navyDeep: "#1E2038", red: "#A45248", amber: "#B8791F",
};
const FONT_HEAD = "'Diagram', 'Archivo', 'IBM Plex Sans', sans-serif";
const FONT_BODY = "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif";

const STATUSES = ["Not started", "Deal negotiation", "Closed"];
const TYPES = ["Lease", "Financing", "Equity", "Development", "Sale", "Other"];
const COMP_FIELDS = [
  ["baseRent", "Base rent"], ["addlRent", "Additional rent"], ["land", "Land value"],
  ["equity", "Equity"], ["loan", "Loan proceeds"], ["devFee", "Dev fee"],
  ["dist", "Distributions"], ["promote", "Promote"], ["exit", "Future exit"],
  ["other", "Other value"],
];
const COMP_KEYS = COMP_FIELDS.map(([k]) => k);

/* Priority system: 1=High, 2=Med, 3=Low, 4/none=None */
const PRIORITY = {
  1: { label: "High", color: "#A4453B", bg: "#F6E4E1" },
  2: { label: "Medium", color: "#B8791F", bg: "#F7ECD8" },
  3: { label: "Low", color: "#3E7E6C", bg: "#E1EFEA" },
  4: { label: "None", color: "#7A8089", bg: "#EDEFF2" },
};
const prio = (p) => PRIORITY[p == null ? 4 : p] || PRIORITY[4];

const FINANCE_STAGES = ["Prospect", "Contacted", "Engaged", "Term Sheet", "Passed"];
const STAGE_TONE = {
  Prospect: { bg: C.mid, fg: C.textDim }, Contacted: { bg: C.purpleSoft, fg: "#5F5280" },
  Engaged: { bg: "#E4EEF7", fg: "#3D5A75" }, "Term Sheet": { bg: C.teal, fg: C.text },
  Passed: { bg: "#F1E5E3", fg: "#8A5248" },
};

/* Closing checklist — CRE debt best practice */
const CLOSING_TEMPLATE = [
  { phase: "Application", items: ["Signed LOI / term sheet", "Application fee / good-faith deposit", "Borrower org docs & authorization"] },
  { phase: "Due Diligence", items: ["Appraisal ordered", "Appraisal received & reviewed", "Environmental (Phase I)", "Property condition report", "Title commitment", "Survey (ALTA)", "Zoning / entitlement confirmation", "Rent roll / operating statements"] },
  { phase: "Underwriting", items: ["Credit committee approval", "Rate lock / spread confirmation", "Insurance binder (evidence)", "Flood determination", "Entity good-standing certs"] },
  { phase: "Legal & Docs", items: ["Loan agreement draft", "Promissory note", "Mortgage / deed of trust", "Guaranty (if any)", "Legal opinion", "Closing checklist reconciled"] },
  { phase: "Closing", items: ["Settlement statement", "Wire instructions verified", "Funds disbursed", "Recorded documents received", "Post-closing binder"] },
];

/* ---------- helpers ---------- */
const dealTotal = (d) => Object.values(d.comps || {}).reduce((s, v) => s + (Number(v) || 0), 0);
const weighted = (d) => d.status === "Deal negotiation" && d.likelihood != null ? dealTotal(d) * (d.likelihood / 100) : dealTotal(d);
const fmt$ = (n, compact) => {
  if (n == null || isNaN(n)) return "—";
  if (compact) {
    const a = Math.abs(n);
    if (a >= 1e6) return "$" + (n / 1e6).toFixed(a >= 1e7 ? 1 : 2).replace(/\.0+$/, "") + "M";
    if (a >= 1e3) return "$" + Math.round(n / 1e3) + "K";
  }
  return "$" + Math.round(n).toLocaleString("en-US");
};
const pct = (n) => (n * 100).toFixed(1) + "%";
const uid = () => "x" + Math.random().toString(36).slice(2, 9);
const monthKey = (dstr) => (dstr ? dstr.slice(0, 7) : null);
const parseDate = (s) => { if (!s) return null; const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const daysUntil = (s) => { const d = parseDate(s); return d ? Math.round((d - new Date()) / 86400000) : null; };
const fmtDate = (s) => { const d = parseDate(s); return d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"; };
function monthsBetween(a, b) {
  const out = []; const d = new Date(a.getFullYear(), a.getMonth(), 1);
  while (d <= b) { out.push(d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0")); d.setMonth(d.getMonth() + 1); }
  return out;
}
const monthLabel = (k) => { const [y, m] = k.split("-"); return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+m - 1] + " ’" + y.slice(2); };
const goalLabel = (endStr) => { const d = parseDate(endStr); const q = Math.floor(d.getMonth() / 3) + 1; return (d.getMonth() === 11 && d.getDate() === 31) ? d.getFullYear() + " EOY" : `Q${q} ${d.getFullYear()}`; };

function inferBuilding(name) {
  const n = (name || "").toLowerCase();
  if (/liberty|ceviche|springfield scoops/.test(n)) return "Liberty Building";
  if (/phoenix building|friends of phoenix/.test(n)) return "Phoenix Building";
  if (/bunker/.test(n)) return "Bunker Building";
  if (/emerald/.test(n)) return "Emerald Station";
  if (/hera/.test(n)) return "The Hub";
  if (/edc3|hubbard/.test(n)) return "2404 Hubbard";
  return null;
}

/* ---------- state migration ---------- */
function freshState() {
  return {
    target: TARGET_DEFAULT, windowStart: "2025-01-01", windowEnd: "2026-12-31",
    pipeline: SEED.pipeline, canvasses: SEED.canvasses, closings: {},
    loans: SEED.loans, projects: defaultProjects(), tasks: defaultTasks(),
  };
}
function defaultProjects() {
  return [
    { id: uid(), name: "Blue Zones Pilot Identification", stage: "Active", owner: "Ben Leedle", targetDate: "2026-08-15", notes: "90-day sprint deliverable 1", tags: ["Blue Zones"] },
    { id: uid(), name: "Blue Zones Investment Vehicle Scoping", stage: "Active", owner: "Brendan", targetDate: "2026-08-30", notes: "90-day sprint deliverable 2", tags: ["Blue Zones"] },
    { id: uid(), name: "Partnership Playbook", stage: "Not started", owner: "Brendan", targetDate: "2026-09-15", notes: "90-day sprint deliverable 3", tags: ["Blue Zones"] },
    { id: uid(), name: "GemLife (Tier 1 archetype)", stage: "Prospecting", owner: "Brendan", targetDate: null, notes: "Australian over-50s communities", tags: ["Blue Zones", "Partner"] },
  ];
}
function defaultTasks() {
  const mk = (title, col, date) => ({ id: uid(), title, col, date });
  return [
    mk("Updates to pro forma and investment page", "Doing", "2026-07-15"),
    mk("Complete Fund deck", "To Do", "2026-07-20"),
    mk("Even out pro forma - less deployment up front, 3% acquisition fee", "To Do", "2026-07-20"),
    mk("1 pager", "To Do", "2026-07-14"),
    mk("Fuse loan extension", "Waiting", "2026-06-02"),
    mk("Blue Zones LOI", "Waiting", "2026-05-29"),
    mk("LOI for Hera", "Waiting", "2026-05-08"),
    mk("Respond to Gemlife", "Waiting", "2026-07-09"),
    mk("Q1 Investor Update", "Waiting", "2026-04-07"),
    mk("high level asset management report", "Backlog", "2026-04-30"),
    mk("dev site a&b capital raising documents", "Backlog", "2026-05-13"),
    mk("Lisbon Palace", "Backlog", null),
  ];
}
function migrate(data) {
  if (!data) return null;
  data.target = data.target || TARGET_DEFAULT;
  data.windowStart = data.windowStart || "2025-01-01";
  data.windowEnd = data.windowEnd || "2026-12-31";
  data.pipeline = (data.pipeline || []).map((d) => ({
    ...d,
    building: d.building !== undefined ? d.building : inferBuilding(d.name),
    likelihood: d.likelihood !== undefined ? d.likelihood : (d.status === "Deal negotiation" ? 50 : null),
    targetClose: d.targetClose !== undefined ? d.targetClose : null,
  }));
  data.canvasses = (data.canvasses || SEED.canvasses).map((cv) => ({
    ...cv,
    lenders: cv.lenders.map((l) => ({ ...l, stage: l.stage || "Prospect", notes: l.notes ?? null })),
  }));
  data.closings = data.closings || {};
  data.loans = data.loans || SEED.loans;
  data.projects = data.projects || defaultProjects();
  data.tasks = data.tasks || defaultTasks();
  return data;
}

/* ---------- primitives ---------- */
const kicker = { fontFamily: FONT_HEAD, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: C.purple };
const cardStyle = { background: C.void_, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 };
const inputStyle = { border: `1.5px solid rgba(41,43,65,0.15)`, borderRadius: 6, padding: "9px 11px", fontSize: 14, fontFamily: FONT_BODY, color: C.text, background: C.void_, outline: "none", width: "100%", boxSizing: "border-box" };

const btnStyle = (kind) => ({
  border: kind === "primary" || kind === "purple" ? "none" : `1.5px solid ${kind === "ghost-danger" ? "rgba(164,82,72,0.4)" : "rgba(41,43,65,0.2)"}`,
  background: kind === "primary" ? C.teal : kind === "purple" ? C.purple : "transparent",
  color: kind === "primary" ? C.text : kind === "purple" ? "#fff" : kind === "ghost-danger" ? C.red : C.text,
  borderRadius: 6, padding: "9px 16px", fontSize: 11.5, fontWeight: 600, cursor: "pointer",
  fontFamily: FONT_BODY, letterSpacing: "0.08em", textTransform: "uppercase",
  boxShadow: kind === "primary" ? "0 2px 10px rgba(139,123,168,0.3)" : "none",
});

function PriorityBadge({ p }) {
  const x = prio(p);
  return <span style={{ background: x.bg, color: x.color, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.04em", padding: "3px 9px", borderRadius: 99, whiteSpace: "nowrap" }}>{x.label}</span>;
}
function Chip({ children, tone }) {
  const tones = { teal: { bg: C.teal, fg: C.text }, purple: { bg: C.purpleSoft, fg: "#5F5280" }, gray: { bg: C.mid, fg: C.textDim } };
  const t = tones[tone] || tones.gray;
  return <span style={{ background: t.bg, color: t.fg, fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 99, whiteSpace: "nowrap" }}>{children}</span>;
}
const statusTone = (s) => (s === "Closed" ? "teal" : s === "Deal negotiation" ? "purple" : "gray");

function StatusSelect({ value, onChange }) {
  const tone = { teal: { bg: C.teal, fg: C.text }, purple: { bg: C.purpleSoft, fg: "#5F5280" }, gray: { bg: C.mid, fg: C.textDim } }[statusTone(value)];
  return (
    <select value={value} onClick={(e) => e.stopPropagation()} onChange={(e) => onChange(e.target.value)}
      style={{ background: tone.bg, color: tone.fg, border: "none", borderRadius: 99, fontSize: 11, fontWeight: 600, padding: "4px 9px", cursor: "pointer", fontFamily: FONT_BODY, appearance: "none", WebkitAppearance: "none" }}>
      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}
function Field({ label, children }) {
  return <label style={{ display: "flex", flexDirection: "column", gap: 5 }}><span style={{ ...kicker, fontSize: 9.5 }}>{label}</span>{children}</label>;
}
function Modal({ title, children, onClose, wide }) {
  return (
    <div onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, background: "rgba(41,43,65,0.55)", zIndex: 60, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "5vh 16px", overflowY: "auto" }}>
      <div style={{ background: C.void_, borderRadius: 12, width: "100%", maxWidth: wide ? 820 : 620, padding: 24, boxShadow: "0 24px 64px rgba(30,32,56,0.35)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ margin: 0, fontFamily: FONT_HEAD, fontSize: 21, fontWeight: 700, letterSpacing: "-0.03em", color: C.text }}>{title}</h3>
          <button onClick={onClose} aria-label="Close" style={{ border: "none", background: "transparent", fontSize: 20, cursor: "pointer", color: C.textDim }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* Reusable kanban column drop target */
function useDnd(onDrop) {
  const [over, setOver] = useState(null);
  const handlers = (col) => ({
    onDragOver: (e) => { e.preventDefault(); if (over !== col) setOver(col); },
    onDragLeave: () => setOver((o) => (o === col ? null : o)),
    onDrop: (e) => { e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); if (id) onDrop(id, col); setOver(null); },
  });
  return { over, handlers };
}
/* ================= DEAL EDITOR ================= */
function DealEditor({ deal, buildings, onSave, onDelete, onClose }) {
  const [d, setD] = useState(() => ({ ...deal, comps: { ...deal.comps }, priority: deal.priority ?? "", dateClosed: deal.dateClosed || "", building: deal.building || "", likelihood: deal.likelihood ?? "", targetClose: deal.targetClose || "" }));
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const setComp = (k, v) => setD((p) => ({ ...p, comps: { ...p.comps, [k]: v === "" ? null : Number(v) } }));
  const total = dealTotal(d);
  const isNew = !deal.name;
  const showLikelihood = d.status === "Deal negotiation";
  const showTarget = d.status !== "Closed";

  return (
    <Modal onClose={onClose} title={isNew ? "New deal" : "Edit deal"}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Field label="Deal name"><input style={inputStyle} value={d.name || ""} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Bridge Loan Refinancing" autoFocus={isNew} /></Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Type"><select style={inputStyle} value={d.type} onChange={(e) => set("type", e.target.value)}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
          <Field label="Status"><select style={inputStyle} value={d.status} onChange={(e) => set("status", e.target.value)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Priority"><select style={inputStyle} value={d.priority} onChange={(e) => set("priority", e.target.value === "" ? "" : +e.target.value)}>
            <option value="">None</option><option value={1}>1 — High</option><option value={2}>2 — Medium</option><option value={3}>3 — Low</option></select></Field>
          <Field label="Building / project">
            <input style={inputStyle} list="foc-buildings" value={d.building} onChange={(e) => set("building", e.target.value)} placeholder="Type or pick — e.g. Liberty Building" />
            <datalist id="foc-buildings">{(buildings || []).map((b) => <option key={b} value={b} />)}</datalist>
          </Field>
          {showTarget && <Field label="Target closing date"><input type="date" style={inputStyle} value={d.targetClose} onChange={(e) => set("targetClose", e.target.value)} /></Field>}
          {d.status === "Closed" && <Field label="Date closed"><input type="date" style={inputStyle} value={d.dateClosed} onChange={(e) => set("dateClosed", e.target.value)} /></Field>}
          {showLikelihood && (
            <Field label={`Likelihood to close — ${d.likelihood || 0}%`}>
              <input type="range" min="0" max="100" step="5" value={d.likelihood || 0} onChange={(e) => set("likelihood", +e.target.value)} style={{ accentColor: C.purple, width: "100%" }} />
            </Field>
          )}
        </div>

        <div>
          <div style={{ ...kicker, fontSize: 9.5, marginBottom: 8 }}>Value components</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {COMP_FIELDS.map(([k, label]) => (
              <label key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: C.textDim, width: 104, flexShrink: 0 }}>{label}</span>
                <input type="number" style={{ ...inputStyle, padding: "6px 9px", fontSize: 13 }} value={d.comps[k] ?? ""} placeholder="—" onChange={(e) => setComp(k, e.target.value)} />
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: 14, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", gap: 22 }}>
            <div><div style={{ ...kicker, fontSize: 9.5 }}>Total value</div><div style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em", color: C.text }}>{fmt$(total)}</div></div>
            {showLikelihood && <div><div style={{ ...kicker, fontSize: 9.5 }}>Weighted</div><div style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em", color: C.purple }}>{fmt$(weighted(d))}</div></div>}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {!isNew && <button onClick={() => { if (window.confirm("Delete this deal?")) onDelete(d.id); }} style={btnStyle("ghost-danger")}>Delete</button>}
            <button onClick={onClose} style={btnStyle("ghost")}>Cancel</button>
            <button onClick={() => { if (!d.name) { window.alert("Give the deal a name."); return; } onSave({ ...d, priority: d.priority === "" ? null : d.priority, dateClosed: d.dateClosed || null, building: d.building.trim() || null, likelihood: showLikelihood ? (d.likelihood === "" ? null : d.likelihood) : null, targetClose: d.targetClose || null }); }} style={btnStyle("primary")}>Save deal</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* ================= OVERVIEW ================= */
function CapitalBar({ closed, neg, weightedNeg, target, dark }) {
  const scale = Math.max(target, closed + neg);
  const w = (v) => (v / scale) * 100;
  const gap = Math.max(target - closed - neg, 0);
  const gapBg = dark ? "repeating-linear-gradient(-55deg, rgba(255,255,255,0.07), rgba(255,255,255,0.07) 7px, rgba(255,255,255,0.13) 7px, rgba(255,255,255,0.13) 14px)" : "repeating-linear-gradient(-55deg, #EEF0F4, #EEF0F4 7px, #E4E7ED 7px, #E4E7ED 14px)";
  const sub = dark ? "rgba(255,255,255,0.65)" : C.textDim, strong = dark ? "#fff" : C.text;
  return (
    <div>
      <div style={{ display: "flex", height: 44, borderRadius: 8, overflow: "hidden", border: dark ? "1px solid rgba(255,255,255,0.15)" : `1px solid ${C.border}` }}>
        <div style={{ width: w(closed) + "%", background: `linear-gradient(180deg, ${C.teal}, ${C.tealDim})`, transition: "width .6s" }} />
        <div style={{ width: w(neg) + "%", background: `repeating-linear-gradient(-55deg, ${C.purple}, ${C.purple} 7px, #9C8DB8 7px, #9C8DB8 14px)`, transition: "width .6s" }} />
        {gap > 0 && <div style={{ width: w(gap) + "%", background: gapBg }} />}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px", marginTop: 10, fontSize: 12.5, color: sub }}>
        <span><i style={dot(C.teal)} /> Closed <b style={{ color: strong }}>{fmt$(closed, true)}</b> · {pct(closed / target)}</span>
        <span><i style={dot(C.purple)} /> In negotiation <b style={{ color: strong }}>{fmt$(neg, true)}</b> · <b style={{ color: strong }}>{fmt$(weightedNeg, true)}</b> weighted</span>
        <span><i style={dot(dark ? "rgba(255,255,255,0.2)" : "#E4E7ED")} /> Gap <b style={{ color: strong }}>{fmt$(gap, true)}</b></span>
      </div>
    </div>
  );
}
const dot = (c) => ({ display: "inline-block", width: 9, height: 9, borderRadius: 3, background: c, marginRight: 6 });

function Overview({ pipeline, target, windowStart, windowEnd, onOpenDeal, onEditGoal }) {
  const now = new Date();
  const start = parseDate(windowStart), end = parseDate(windowEnd), startKey = windowStart.slice(0, 7);
  const closedDeals = pipeline.filter((p) => p.status === "Closed");
  const inWindow = (p) => !p.dateClosed || monthKey(p.dateClosed) >= startKey;
  const closed = closedDeals.filter(inWindow).reduce((s, p) => s + dealTotal(p), 0);
  const preWindow = closedDeals.filter((p) => !inWindow(p)).reduce((s, p) => s + dealTotal(p), 0);
  const negDeals = pipeline.filter((p) => p.status === "Deal negotiation");
  const neg = negDeals.reduce((s, p) => s + dealTotal(p), 0);
  const weightedNeg = negDeals.reduce((s, p) => s + weighted(p), 0);
  const notStarted = pipeline.filter((p) => p.status === "Not started").reduce((s, p) => s + dealTotal(p), 0);
  const remaining = Math.max(target - closed, 0);
  const qRemaining = Math.max((end - now) / 86400000 / Q_DAYS, 0);
  const qElapsed = Math.max((Math.min(now, end) - start) / 86400000 / Q_DAYS, 0.01);
  const needPerQ = qRemaining > 0 ? remaining / qRemaining : remaining;
  const avgToDate = closed / qElapsed;

  const months = monthsBetween(start, end);
  const chartData = months.map((m) => {
    const cum = closedDeals.filter((p) => inWindow(p) && monthKey(p.dateClosed) && monthKey(p.dateClosed) <= m).reduce((s, p) => s + dealTotal(p), 0);
    return { label: monthLabel(m), cum: m > now.toISOString().slice(0, 7) ? null : cum };
  });
  const tickInterval = Math.max(1, Math.floor(months.length / 10));

  const negotiating = [...negDeals].sort((a, b) => weighted(b) - weighted(a));
  const highValueNotStarted = pipeline.filter((p) => p.status === "Not started").sort((a, b) => dealTotal(b) - dealTotal(a)).slice(0, 6);

  const Header = ({ children, style }) => <div style={{ ...kicker, fontSize: 8.5, color: C.textDim, ...style }}>{children}</div>;
  const DealRow = ({ p, showWeighted }) => {
    const dc = daysUntil(p.targetClose);
    return (
      <div onClick={() => onOpenDeal(p)} style={{ display: "grid", gridTemplateColumns: "70px 1fr auto auto", alignItems: "center", gap: 12, padding: "10px 4px", borderTop: `1px solid ${C.border}`, cursor: "pointer" }}>
        <PriorityBadge p={p.priority} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
          <div style={{ fontSize: 11.5, color: C.textDim }}>{p.type}{p.building ? " · " + p.building : ""}{p.targetClose ? ` · closes ${fmtDate(p.targetClose)}${dc != null && dc < 45 ? ` (${dc}d)` : ""}` : ""}</div>
        </div>
        {showWeighted ? (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: C.purple, fontWeight: 700 }}>{p.likelihood ?? 0}%</div>
            <div style={{ fontSize: 10.5, color: C.textDim }}>likely</div>
          </div>
        ) : <div />}
        <div style={{ textAlign: "right", minWidth: 76 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>{fmt$(dealTotal(p), true)}</div>
          {showWeighted && <div style={{ fontSize: 11, color: C.purple, fontVariantNumeric: "tabular-nums" }}>{fmt$(weighted(p), true)} wtd</div>}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <section style={{ borderRadius: 12, padding: "28px 26px", color: "#fff", position: "relative", overflow: "hidden", background: `radial-gradient(600px 300px at 85% 0%, rgba(166,220,205,0.12), transparent 60%), linear-gradient(135deg, ${C.text} 0%, ${C.navy2} 55%, ${C.purple} 130%)` }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 14, marginBottom: 20 }}>
          <div>
            <div style={{ ...kicker, color: C.teal, marginBottom: 8, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span>Contracted Capital · {fmt$(target, true)} by {goalLabel(windowEnd)}</span>
              <button onClick={onEditGoal} style={{ border: "1px solid rgba(166,220,205,0.4)", background: "transparent", color: C.teal, borderRadius: 99, padding: "2px 10px", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", fontFamily: FONT_BODY }}>Edit goal</button>
            </div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: "clamp(34px, 4.5vw, 52px)", fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1.05 }}>{fmt$(closed)}</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>closed since {monthLabel(startKey)}{preWindow > 0 && <span style={{ fontSize: 12, opacity: 0.8 }}> · excludes {fmt$(preWindow, true)} closed earlier</span>}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 30, fontWeight: 700, letterSpacing: "-0.04em", color: C.teal }}>{pct(closed / target)}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>of target · {pct((closed + weightedNeg) / target)} incl. weighted pipeline</div>
          </div>
        </div>
        <CapitalBar closed={closed} neg={neg} weightedNeg={weightedNeg} target={target} dark />
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        {[["Remaining to target", fmt$(remaining, true), null], ["Quarters remaining", qRemaining.toFixed(2), "to " + monthLabel(windowEnd.slice(0, 7))], ["Needed per quarter", fmt$(needPerQ, true), "to hit target"], ["Avg closed / qtr", fmt$(avgToDate, true), "since " + monthLabel(startKey)], ["Weighted pipeline", fmt$(weightedNeg, true), "probability-adjusted"]].map(([label, value, sub]) => (
          <div key={label} style={{ ...cardStyle, padding: "14px 16px", borderBottom: `3px solid ${C.teal}` }}>
            <div style={{ ...kicker, fontSize: 9 }}>{label}</div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 25, fontWeight: 700, letterSpacing: "-0.04em", color: C.text, marginTop: 5 }}>{value}</div>
            {sub && <div style={{ fontSize: 11.5, color: C.textDim, marginTop: 2 }}>{sub}</div>}
          </div>
        ))}
      </section>

      <section style={cardStyle}>
        <div style={{ ...kicker, marginBottom: 12 }}>Cumulative Closed Capital</div>
        <div style={{ width: "100%", height: 240 }}>
          <ResponsiveContainer>
            <AreaChart data={chartData} margin={{ top: 6, right: 8, left: 4, bottom: 0 }}>
              <defs><linearGradient id="gClosed" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.tealDim} stopOpacity={0.45} /><stop offset="100%" stopColor={C.teal} stopOpacity={0.03} /></linearGradient></defs>
              <CartesianGrid stroke={C.mid} strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10.5, fill: C.textDim }} interval={tickInterval} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => "$" + v / 1e6 + "M"} tick={{ fontSize: 10.5, fill: C.textDim }} axisLine={false} tickLine={false} width={44} />
              <Tooltip formatter={(v) => [fmt$(v), "Cumulative closed"]} labelStyle={{ color: C.textDim, fontSize: 12 }} contentStyle={{ borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13, fontFamily: FONT_BODY }} />
              <ReferenceLine y={target} stroke={C.purple} strokeDasharray="5 4" label={{ value: "Target " + fmt$(target, true), position: "insideTopRight", fill: C.purple, fontSize: 11 }} />
              <Area type="monotone" dataKey="cum" stroke={C.tealDim} strokeWidth={2.4} fill="url(#gClosed)" connectNulls={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section style={{ ...cardStyle, borderTop: `3px solid ${C.purple}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4, flexWrap: "wrap", gap: 6 }}>
          <div style={kicker}>In Negotiation · Likely to Close</div>
          <div style={{ fontSize: 12.5, color: C.textDim }}>{negotiating.length} deals · <b style={{ color: C.text }}>{fmt$(neg, true)}</b> · <b style={{ color: C.purple }}>{fmt$(weightedNeg, true)}</b> weighted</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "70px 1fr auto auto", gap: 12, padding: "4px" }}>
          <Header>Priority</Header><Header>Deal name</Header><Header style={{ textAlign: "right" }}>Likely</Header><Header style={{ textAlign: "right" }}>Total / weighted</Header>
        </div>
        {negotiating.map((p) => <DealRow key={p.id} p={p} showWeighted />)}
        {negotiating.length === 0 && <div style={{ padding: "14px 4px", fontSize: 13, color: C.textDim }}>Nothing in negotiation right now.</div>}
      </section>

      <section style={{ ...cardStyle, borderTop: `3px solid ${C.teal}` }}>
        <div style={{ ...kicker, marginBottom: 4 }}>High-Value Not Started</div>
        <div style={{ display: "grid", gridTemplateColumns: "70px 1fr auto auto", gap: 12, padding: "4px" }}>
          <Header>Priority</Header><Header>Deal name</Header><Header /><Header style={{ textAlign: "right" }}>Total value</Header>
        </div>
        {highValueNotStarted.map((p) => <DealRow key={p.id} p={p} />)}
      </section>
    </div>
  );
}

/* ================= PIPELINE ================= */
function Pipeline({ pipeline, setPipeline, onOpenDeal, leaseOnly }) {
  const [view, setView] = useState("table");
  const [q, setQ] = useState(""); const [fType, setFType] = useState("All"); const [fStatus, setFStatus] = useState("All");
  const [sort, setSort] = useState({ key: "total", dir: -1 });

  const rows = useMemo(() => {
    let r = pipeline.filter((p) => (!leaseOnly || p.type === "Lease"));
    if (fType !== "All") r = r.filter((p) => p.type === fType);
    if (fStatus !== "All") r = r.filter((p) => p.status === fStatus);
    if (q) r = r.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    const get = (p) => sort.key === "total" ? dealTotal(p) : sort.key === "priority" ? (p.priority ?? 9) : sort.key === "date" ? (p.dateClosed || "") : sort.key === "building" ? (p.building || "") : (p[sort.key] || "");
    return [...r].sort((a, b) => { const va = get(a), vb = get(b); return (va < vb ? -1 : va > vb ? 1 : 0) * sort.dir; });
  }, [pipeline, q, fType, fStatus, sort, leaseOnly]);

  const setStatus = (id, status) => setPipeline((p) => p.map((d) => d.id === id ? { ...d, status, dateClosed: status === "Closed" && !d.dateClosed ? new Date().toISOString().slice(0, 10) : d.dateClosed, likelihood: status === "Deal negotiation" && d.likelihood == null ? 50 : d.likelihood } : d));
  const { over, handlers } = useDnd(setStatus);

  const th = (label, key, align) => <th onClick={() => setSort((s) => ({ key, dir: s.key === key ? -s.dir : -1 }))} style={{ textAlign: align || "left", padding: "9px 10px", fontFamily: FONT_HEAD, fontSize: 9.5, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: C.purple, cursor: "pointer", whiteSpace: "nowrap", userSelect: "none" }}>{label}{sort.key === key ? (sort.dir === -1 ? " ↓" : " ↑") : ""}</th>;
  const summary = { count: rows.length, total: rows.reduce((s, p) => s + dealTotal(p), 0), closed: rows.filter((p) => p.status === "Closed").reduce((s, p) => s + dealTotal(p), 0) };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search deals…" style={{ ...inputStyle, width: 190, padding: "8px 11px" }} />
        {!leaseOnly && <select value={fType} onChange={(e) => setFType(e.target.value)} style={{ ...inputStyle, width: "auto", padding: "8px 11px" }}><option>All</option>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>}
        <select value={fStatus} onChange={(e) => setFStatus(e.target.value)} style={{ ...inputStyle, width: "auto", padding: "8px 11px" }}><option>All</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
        <div style={{ display: "flex", border: `1.5px solid rgba(41,43,65,0.15)`, borderRadius: 6, overflow: "hidden" }}>
          {["table", "board"].map((v) => <button key={v} onClick={() => setView(v)} style={{ border: "none", padding: "8px 14px", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: FONT_BODY, background: view === v ? C.text : "transparent", color: view === v ? "#fff" : C.textDim }}>{v}</button>)}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12.5, color: C.textDim }}>{summary.count} · <b style={{ color: C.text }}>{fmt$(summary.total, true)}</b> · <b style={{ color: C.tealDeep }}>{fmt$(summary.closed, true)}</b> closed</div>
        <button onClick={() => onOpenDeal({ id: uid(), name: "", type: leaseOnly ? "Lease" : "Financing", status: "Not started", priority: null, dateClosed: null, comps: {}, building: null, likelihood: null, targetClose: null }, true)} style={btnStyle("primary")}>+ Add deal</button>
      </div>

      {view === "table" ? (
        <div style={{ ...cardStyle, padding: 0, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: leaseOnly ? 720 : 680 }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.border}`, background: C.deep }}>
              {th("Deal", "name")}{!leaseOnly && th("Type", "type")}{leaseOnly && th("Building", "building")}{th("Priority", "priority", "center")}{th("Status", "status")}{th("Likely", "likelihood", "center")}{th("Target close", "targetClose", "right")}{th("Total", "total", "right")}
            </tr></thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} onClick={() => onOpenDeal(p)} style={{ borderBottom: `1px solid ${C.border}`, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = C.deep)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "10px", fontSize: 13.5, fontWeight: 600, color: C.text }}>{p.name}</td>
                  {!leaseOnly && <td style={{ padding: "10px", fontSize: 12.5, color: C.textDim }}>{p.type}</td>}
                  {leaseOnly && <td style={{ padding: "10px", fontSize: 12.5, color: C.textDim, whiteSpace: "nowrap" }}>{p.building || "—"}</td>}
                  <td style={{ padding: "10px", textAlign: "center" }}><PriorityBadge p={p.priority} /></td>
                  <td style={{ padding: "10px" }}><StatusSelect value={p.status} onChange={(s) => setStatus(p.id, s)} /></td>
                  <td style={{ padding: "10px", textAlign: "center", fontSize: 12.5, color: p.status === "Deal negotiation" ? C.purple : C.textDim, fontWeight: 600 }}>{p.status === "Deal negotiation" && p.likelihood != null ? p.likelihood + "%" : "—"}</td>
                  <td style={{ padding: "10px", textAlign: "right", fontSize: 12, color: C.textDim, whiteSpace: "nowrap" }}>{p.status !== "Closed" ? fmtDate(p.targetClose) : (p.dateClosed || "—")}</td>
                  <td style={{ padding: "10px", textAlign: "right", fontSize: 13.5, fontWeight: 600, color: C.text, fontVariantNumeric: "tabular-nums" }}>{fmt$(dealTotal(p), true)}</td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={8} style={{ padding: 24, textAlign: "center", color: C.textDim, fontSize: 13 }}>No deals match.</td></tr>}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12, alignItems: "start" }}>
          {STATUSES.map((s) => {
            const col = rows.filter((p) => p.status === s);
            const colTotal = col.reduce((t, p) => t + dealTotal(p), 0);
            return (
              <div key={s} {...handlers(s)} style={{ background: over === s ? C.purpleSoft : C.mid, borderRadius: 10, padding: 10, transition: "background .15s", outline: over === s ? `2px dashed ${C.purple}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 6px 10px" }}>
                  <span style={{ fontFamily: FONT_HEAD, fontSize: 9.5, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: C.purple }}>{s} · {col.length}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{fmt$(colTotal, true)}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 40 }}>
                  {col.map((p) => (
                    <div key={p.id} draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", p.id)} onClick={() => onOpenDeal(p)} style={{ background: C.void_, border: `1px solid ${C.border}`, borderLeft: `3px solid ${prio(p.priority).color}`, borderRadius: 8, padding: "10px 12px", cursor: "grab" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{p.name}</span>
                        <PriorityBadge p={p.priority} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, alignItems: "center" }}>
                        <span style={{ fontSize: 11.5, color: C.textDim }}>{p.type}{p.building ? " · " + p.building : ""}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>{fmt$(dealTotal(p), true)}</span>
                      </div>
                      {s === "Deal negotiation" && p.likelihood != null && <div style={{ marginTop: 6, height: 4, background: C.mid, borderRadius: 2, overflow: "hidden" }}><div style={{ width: p.likelihood + "%", height: "100%", background: C.purple }} /></div>}
                      {p.targetClose && <div style={{ fontSize: 10.5, color: daysUntil(p.targetClose) < 30 ? C.red : C.textDim, marginTop: 5 }}>Target close {fmtDate(p.targetClose)}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {view === "board" && <div style={{ fontSize: 12, color: C.textDim, textAlign: "center" }}>Drag cards between columns to change status.</div>}
    </div>
  );
}

/* ================= LEASING ================= */
function Leasing({ pipeline, setPipeline, onOpenDeal }) {
  const [building, setBuilding] = useState("All");
  const allLeases = pipeline.filter((p) => p.type === "Lease");
  const buildings = [...new Set(allLeases.map((p) => p.building).filter(Boolean))].sort();
  const hasUnassigned = allLeases.some((p) => !p.building);
  const stat = (arr) => arr.reduce((s, p) => s + dealTotal(p), 0);
  const scoped = building === "All" ? pipeline : pipeline.filter((p) => p.type !== "Lease" || (building === "Unassigned" ? !p.building : p.building === building));
  const inScope = allLeases.filter((p) => building === "All" ? true : building === "Unassigned" ? !p.building : p.building === building);
  const closed = inScope.filter((p) => p.status === "Closed"), open = inScope.filter((p) => p.status !== "Closed");
  const chip = (label, value, total) => <button key={value} onClick={() => setBuilding(value)} style={{ border: building === value ? "none" : `1px solid ${C.border}`, background: building === value ? C.text : C.void_, color: building === value ? "#fff" : C.textDim, borderRadius: 99, padding: "6px 13px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FONT_BODY, display: "flex", alignItems: "center", gap: 7 }}>{label}<span style={{ fontSize: 11, fontWeight: 700, color: building === value ? C.teal : C.purple }}>{fmt$(total, true)}</span></button>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span style={{ ...kicker, marginRight: 4 }}>By Building</span>
        {chip("All", "All", stat(allLeases))}
        {buildings.map((b) => chip(b, b, stat(allLeases.filter((p) => p.building === b))))}
        {hasUnassigned && chip("Unassigned", "Unassigned", stat(allLeases.filter((p) => !p.building)))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
        {[["Signed lease value", fmt$(stat(closed), true), closed.length + " leases"], ["Open lease pipeline", fmt$(stat(open), true), open.length + " in progress"], ["In negotiation", fmt$(stat(open.filter((p) => p.status === "Deal negotiation")), true), open.filter((p) => p.status === "Deal negotiation").length + " deals"]].map(([l, v, s]) => (
          <div key={l} style={{ ...cardStyle, padding: "14px 16px", borderBottom: `3px solid ${C.teal}` }}>
            <div style={{ ...kicker, fontSize: 9 }}>{l}</div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 25, fontWeight: 700, letterSpacing: "-0.04em", color: C.text, marginTop: 5 }}>{v}</div>
            <div style={{ fontSize: 11.5, color: C.textDim, marginTop: 2 }}>{s}</div>
          </div>
        ))}
      </div>
      <Pipeline pipeline={scoped} setPipeline={setPipeline} onOpenDeal={onOpenDeal} leaseOnly />
    </div>
  );
}
/* ================= FINANCING CRM ================= */
function LenderEditor({ lender, onSave, onDelete, onClose }) {
  const [d, setD] = useState({ ...lender });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const isNew = !lender.lender;
  return (
    <Modal onClose={onClose} title={isNew ? "Add lender" : d.lender}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Lender"><input style={inputStyle} value={d.lender || ""} onChange={(e) => set("lender", e.target.value)} autoFocus={isNew} /></Field>
          <Field label="Stage"><select style={inputStyle} value={d.stage || "Prospect"} onChange={(e) => set("stage", e.target.value)}>{FINANCE_STAGES.map((s) => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Contact"><input style={inputStyle} value={d.contact || ""} onChange={(e) => set("contact", e.target.value)} /></Field>
          <Field label="Email"><input style={inputStyle} value={d.email || ""} onChange={(e) => set("email", e.target.value)} /></Field>
        </div>
        <Field label="Status line"><input style={inputStyle} value={d.status || ""} onChange={(e) => set("status", e.target.value)} placeholder="e.g. Sent OM 7/18, term sheet expected next week" /></Field>
        <Field label="Notes / activity log"><textarea style={{ ...inputStyle, minHeight: 110, resize: "vertical" }} value={d.notes || ""} onChange={(e) => set("notes", e.target.value)} placeholder="Log calls, quotes, terms discussed…" /></Field>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
          {!isNew && <button onClick={() => { if (window.confirm("Remove this lender?")) onDelete(d.id); }} style={btnStyle("ghost-danger")}>Delete</button>}
          <button onClick={onClose} style={btnStyle("ghost")}>Cancel</button>
          <button onClick={() => { if (!d.lender) { window.alert("Lender name required."); return; } onSave(d); }} style={btnStyle("primary")}>Save</button>
        </div>
      </div>
    </Modal>
  );
}

function Financing({ canvasses, setCanvasses, closings, setClosings, onOpenClosing }) {
  const [tabId, setTabId] = useState(canvasses[0]?.id);
  const [view, setView] = useState("board");
  const [editing, setEditing] = useState(null);
  const current = canvasses.find((c) => c.id === tabId) || canvasses[0];
  const list = current?.lenders || [];
  const setList = (fn) => setCanvasses((cs) => cs.map((c) => c.id === current.id ? { ...c, lenders: typeof fn === "function" ? fn(c.lenders) : fn } : c));
  const setStage = (id, stage) => setList((p) => p.map((l) => l.id === id ? { ...l, stage } : l));
  const { over, handlers } = useDnd(setStage);

  const save = (l) => { setList((p) => p.some((x) => x.id === l.id) ? p.map((x) => x.id === l.id ? l : x) : [...p, l]); setEditing(null); };
  const del = (id) => { setList((p) => p.filter((x) => x.id !== id)); setEditing(null); };

  const addCanvass = () => { const name = window.prompt("Name the financing track (e.g. HUD 221(d)(4) — Dev Sites A&B):"); if (!name?.trim()) return; const nc = { id: uid(), name: name.trim(), lenders: [] }; setCanvasses((cs) => [...cs, nc]); setTabId(nc.id); };
  const renameCanvass = () => { const name = window.prompt("Rename track:", current.name); if (!name?.trim()) return; setCanvasses((cs) => cs.map((c) => c.id === current.id ? { ...c, name: name.trim() } : c)); };
  const deleteCanvass = () => { if (canvasses.length <= 1) { window.alert("Keep at least one track."); return; } if (!window.confirm(`Delete "${current.name}"?`)) return; setCanvasses((cs) => cs.filter((c) => c.id !== current.id)); setTabId(canvasses.find((c) => c.id !== current.id)?.id); };

  const byStage = (st) => list.filter((l) => l.stage === st);
  const snapshot = { total: list.length, engaged: list.filter((l) => ["Engaged", "Term Sheet"].includes(l.stage)).length, termsheets: byStage("Term Sheet").length, passed: byStage("Passed").length };
  const hasClosing = !!closings[current?.id];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
        {canvasses.map((c) => <button key={c.id} onClick={() => setTabId(c.id)} style={{ border: c.id === current?.id ? "none" : `1px solid ${C.border}`, background: c.id === current?.id ? C.text : C.void_, color: c.id === current?.id ? "#fff" : C.textDim, borderRadius: 99, padding: "7px 15px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FONT_BODY }}>{c.name}</button>)}
        <button onClick={addCanvass} style={{ border: `1.5px dashed ${C.purple}`, background: "transparent", color: C.purple, borderRadius: 99, padding: "6px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: FONT_BODY }}>+ New track</button>
      </div>

      {/* snapshot dash */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10 }}>
        {[["Lenders canvassed", snapshot.total, C.text], ["Engaged / advancing", snapshot.engaged, C.tealDeep], ["Term sheets", snapshot.termsheets, C.purple], ["Passed", snapshot.passed, C.red]].map(([l, v, col]) => (
          <div key={l} style={{ ...cardStyle, padding: "12px 14px", borderBottom: `3px solid ${col}` }}>
            <div style={{ ...kicker, fontSize: 8.5 }}>{l}</div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 26, fontWeight: 700, color: col, marginTop: 3 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", border: `1.5px solid rgba(41,43,65,0.15)`, borderRadius: 6, overflow: "hidden" }}>
          {["board", "table"].map((v) => <button key={v} onClick={() => setView(v)} style={{ border: "none", padding: "7px 14px", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: FONT_BODY, background: view === v ? C.text : "transparent", color: view === v ? "#fff" : C.textDim }}>{v}</button>)}
        </div>
        <div style={{ flex: 1 }} />
        <button onClick={() => onOpenClosing(current.id, current.name)} style={btnStyle(hasClosing ? "purple" : "ghost")}>{hasClosing ? "View closing checklist" : "Start closing process"}</button>
        <button onClick={() => setEditing({ id: uid(), lender: "", contact: "", email: "", status: "", notes: "", stage: "Prospect" })} style={btnStyle("primary")}>+ Add lender</button>
      </div>

      {view === "board" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10, alignItems: "start" }}>
          {FINANCE_STAGES.map((st) => {
            const col = byStage(st); const tone = STAGE_TONE[st];
            return (
              <div key={st} {...handlers(st)} style={{ background: over === st ? C.purpleSoft : C.mid, borderRadius: 10, padding: 9, transition: "background .15s", outline: over === st ? `2px dashed ${C.purple}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 5px 9px", alignItems: "center" }}>
                  <span style={{ ...kicker, fontSize: 9, color: tone.fg }}>{st}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.textDim }}>{col.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, minHeight: 40 }}>
                  {col.map((l) => (
                    <div key={l.id} draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", l.id)} onClick={() => setEditing(l)} style={{ background: C.void_, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 11px", cursor: "grab" }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text }}>{l.lender}</div>
                      {l.contact && <div style={{ fontSize: 11, color: C.textDim, marginTop: 1 }}>{l.contact}</div>}
                      {l.status && <div style={{ fontSize: 11, color: C.textDim, marginTop: 5, lineHeight: 1.4 }}>{l.status.length > 90 ? l.status.slice(0, 90) + "…" : l.status}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ ...cardStyle, padding: 0, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.border}`, background: C.deep }}>{["Lender", "Stage", "Contact", "Status", "Notes"].map((h) => <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontFamily: FONT_HEAD, fontSize: 9.5, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: C.purple }}>{h}</th>)}</tr></thead>
            <tbody>
              {[...list].sort((a, b) => FINANCE_STAGES.indexOf(a.stage) - FINANCE_STAGES.indexOf(b.stage)).map((l) => (
                <tr key={l.id} onClick={() => setEditing(l)} style={{ borderBottom: `1px solid ${C.border}`, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = C.deep)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap" }}>{l.lender}</td>
                  <td style={{ padding: "10px 12px" }}><span style={{ background: STAGE_TONE[l.stage].bg, color: STAGE_TONE[l.stage].fg, fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 99 }}>{l.stage}</span></td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: C.textDim, whiteSpace: "nowrap" }}>{l.contact || "—"}{l.email ? <div style={{ fontSize: 11 }}>{l.email}</div> : null}</td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: C.text, maxWidth: 240 }}>{l.status || "—"}</td>
                  <td style={{ padding: "10px 12px", fontSize: 11.5, color: C.textDim, maxWidth: 260 }}>{l.notes ? (l.notes.length > 120 ? l.notes.slice(0, 120) + "…" : l.notes) : "—"}</td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={5} style={{ padding: 24, textAlign: "center", color: C.textDim, fontSize: 13 }}>No lenders yet — add one or pull from the database.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
      {view === "board" && <div style={{ fontSize: 12, color: C.textDim, textAlign: "center" }}>Drag lenders between stages. Click any card to log notes and activity.</div>}

      {editing && <LenderEditor lender={editing} onSave={save} onDelete={del} onClose={() => setEditing(null)} />}
    </div>
  );
}

/* ================= CLOSING PROCESS ================= */
function ClosingProcess({ trackId, trackName, closing, setClosing, onClose }) {
  const data = closing || { targetDate: "", items: CLOSING_TEMPLATE.flatMap((ph) => ph.items.map((label) => ({ id: uid(), phase: ph.phase, label, done: false, due: "", docLink: "" }))) };
  const update = (patch) => setClosing({ ...data, ...patch });
  const setItem = (id, patch) => update({ items: data.items.map((it) => it.id === id ? { ...it, ...patch } : it) });
  const delItem = (id) => update({ items: data.items.filter((it) => it.id !== id) });
  const addItem = (phase) => update({ items: [...data.items, { id: uid(), phase, label: "New item", done: false, due: "", docLink: "" }] });
  const done = data.items.filter((i) => i.done).length, total = data.items.length || 1;
  const phases = [...new Set(data.items.map((i) => i.phase))];

  const renamePhase = (ph) => { const name = window.prompt("Rename phase:", ph); if (!name?.trim() || name === ph) return; update({ items: data.items.map((it) => it.phase === ph ? { ...it, phase: name.trim() } : it) }); };
  const addPhase = () => { const name = window.prompt("New phase name (e.g. Insurance, Entitlements):"); if (!name?.trim()) return; update({ items: [...data.items, { id: uid(), phase: name.trim(), label: "New item", done: false, due: "", docLink: "" }] }); };

  return (
    <Modal onClose={onClose} title={`Closing — ${trackName}`} wide>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ ...kicker, fontSize: 8.5, marginBottom: 6 }}>Progress · {done}/{data.items.length} complete</div>
            <div style={{ height: 8, background: C.mid, borderRadius: 4, overflow: "hidden" }}><div style={{ width: (done / total) * 100 + "%", height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.tealDim})`, transition: "width .4s" }} /></div>
          </div>
          <Field label="Target closing date"><input type="date" style={{ ...inputStyle, width: 170 }} value={data.targetDate} onChange={(e) => update({ targetDate: e.target.value })} /></Field>
        </div>
        {phases.map((ph) => (
          <div key={ph}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span onClick={() => renamePhase(ph)} title="Click to rename" style={{ ...kicker, fontSize: 9.5, color: C.text, cursor: "pointer" }}>{ph}</span>
              <button onClick={() => addItem(ph)} style={{ border: "none", background: "transparent", color: C.purple, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: FONT_BODY }}>+ item</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {data.items.filter((i) => i.phase === ph).map((it) => (
                <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: it.done ? "#EFF6F2" : C.deep, borderRadius: 7, border: `1px solid ${C.border}` }}>
                  <input type="checkbox" checked={it.done} onChange={(e) => setItem(it.id, { done: e.target.checked })} style={{ accentColor: C.tealDeep, width: 16, height: 16, flexShrink: 0 }} />
                  <input value={it.label} onChange={(e) => setItem(it.id, { label: e.target.value })} style={{ flex: 1, border: "none", background: "transparent", fontSize: 13, color: C.text, fontFamily: FONT_BODY, textDecoration: it.done ? "line-through" : "none", opacity: it.done ? 0.6 : 1, outline: "none" }} />
                  <input type="date" value={it.due} onChange={(e) => setItem(it.id, { due: e.target.value })} style={{ ...inputStyle, width: 128, padding: "4px 7px", fontSize: 11.5 }} />
                  <input value={it.docLink} onChange={(e) => setItem(it.id, { docLink: e.target.value })} placeholder="Doc link" style={{ ...inputStyle, width: 100, padding: "4px 7px", fontSize: 11.5 }} />
                  {it.docLink && <a href={it.docLink} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: C.purple, fontSize: 15, textDecoration: "none" }}>↗</a>}
                  <button onClick={() => delItem(it.id)} title="Delete" style={{ border: "none", background: "transparent", color: C.red, cursor: "pointer", fontSize: 16, flexShrink: 0 }}>×</button>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
          <button onClick={addPhase} style={btnStyle("ghost")}>+ Add phase</button>
          <div style={{ fontSize: 12, color: C.textDim }}>Starts from CRE best-practice template — edit labels, dates, phases freely.</div>
        </div>
      </div>
    </Modal>
  );
}

/* ================= LOAN TRACKER ================= */
const MONTHS_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function LoanTracker({ loans, setLoans }) {
  const [detail, setDetail] = useState(null); const [q, setQ] = useState("");
  const [horizon, setHorizon] = useState(24); // months shown on timeline
  const active = loans.filter((l) => l.amount);
  const totalDebt = active.reduce((s, l) => s + (l.outstanding || l.amount || 0), 0);
  const monthlyDebtService = active.reduce((s, l) => s + (l.paymentAmount || 0), 0);
  const setLoan = (id, patch) => setLoans((p) => p.map((l) => l.id === id ? { ...l, ...patch } : l));

  // Events: maturities + future payment step-ups
  const events = [];
  loans.forEach((l) => {
    if (l.maturityDate) events.push({ id: l.id + "-mat", type: "Maturity", loan: l, date: l.maturityDate, amount: l.balloon || l.outstanding || l.amount });
    (l.futurePayments || []).forEach((fp, i) => { if (fp.date) events.push({ id: l.id + "-fp" + i, type: "Payment change", loan: l, date: fp.date, amount: fp.amount, note: fp.note }); });
  });

  const rows = q ? loans.filter((l) => [l.name, l.lender, l.borrower, l.address].some((f) => f && f.toLowerCase().includes(q.toLowerCase()))) : loans;
  const matColor = (d) => d < 0 ? C.textDim : d < 90 ? C.red : d < 180 ? C.amber : C.tealDeep;

  // Timeline: build month buckets from this month forward `horizon` months
  const now = new Date();
  const startY = now.getFullYear(), startM = now.getMonth();
  const buckets = [];
  for (let i = 0; i < horizon; i++) {
    const y = startY + Math.floor((startM + i) / 12), m = (startM + i) % 12;
    buckets.push({ y, m, key: y + "-" + String(m + 1).padStart(2, "0"), events: [] });
  }
  const overdue = [];
  events.forEach((e) => {
    const dt = parseDate(e.date); if (!dt) return;
    const b = buckets.find((bk) => bk.y === dt.getFullYear() && bk.m === dt.getMonth());
    if (b) b.events.push(e);
    else if (dt < new Date(startY, startM, 1)) overdue.push(e);
  });
  // group buckets by year for header band
  const yearBands = [];
  buckets.forEach((b, i) => { const last = yearBands[yearBands.length - 1]; if (last && last.y === b.y) last.span++; else yearBands.push({ y: b.y, span: 1, startIdx: i }); });

  const upcoming = events.map((e) => ({ ...e, d: daysUntil(e.date) })).filter((e) => e.d != null && e.d > -90 && e.d < horizon * 31).sort((a, b) => a.d - b.d);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
        {[["Active loans", active.length, C.text], ["Total debt outstanding", fmt$(totalDebt), C.text], ["Monthly debt service", fmt$(monthlyDebtService), C.purple], ["Maturing < 12 months", upcoming.filter((l) => l.type === "Maturity" && l.d < 365 && l.d >= 0).length, C.amber]].map(([l, v, col]) => (
          <div key={l} style={{ ...cardStyle, padding: "13px 15px", borderBottom: `3px solid ${col}` }}><div style={{ ...kicker, fontSize: 8.5 }}>{l}</div><div style={{ fontFamily: FONT_HEAD, fontSize: 22, fontWeight: 700, color: col, marginTop: 3 }}>{v}</div></div>
        ))}
      </div>

      {/* Horizontal timeline */}
      <section style={{ ...cardStyle }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <div style={kicker}>Maturity & Payment Timeline</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[12, 24, 36].map((h) => <button key={h} onClick={() => setHorizon(h)} style={{ border: horizon === h ? "none" : `1px solid ${C.border}`, background: horizon === h ? C.text : C.void_, color: horizon === h ? "#fff" : C.textDim, borderRadius: 99, padding: "5px 13px", fontSize: 11.5, fontWeight: 600, cursor: "pointer", fontFamily: FONT_BODY }}>{h} mo</button>)}
          </div>
        </div>

        {overdue.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14, padding: "8px 12px", background: "#F6EAE7", borderRadius: 8 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: C.red, alignSelf: "center" }}>PAST DUE:</span>
            {overdue.map((e) => <span key={e.id} onClick={() => setDetail(e.loan)} style={{ fontSize: 11.5, color: "#8A3E30", cursor: "pointer", background: "#F1DBD6", padding: "3px 9px", borderRadius: 99 }}>{e.loan.name} · {fmtDate(e.date)}</span>)}
          </div>
        )}

        <div style={{ overflowX: "auto", paddingBottom: 8 }}>
          <div style={{ minWidth: Math.max(horizon * 68, 600) }}>
            {/* Year band */}
            <div style={{ display: "flex", marginBottom: 4 }}>
              {yearBands.map((yb) => (
                <div key={yb.y} style={{ width: yb.span * 68, flexShrink: 0, borderLeft: `2px solid ${C.border}`, paddingLeft: 6, fontFamily: FONT_HEAD, fontSize: 12, fontWeight: 700, color: C.text }}>{yb.y}</div>
              ))}
            </div>
            {/* Baseline with month ticks */}
            <div style={{ display: "flex", position: "relative", borderTop: `2px solid ${C.mid}`, paddingTop: 0 }}>
              {buckets.map((b, i) => {
                const isNow = b.y === startY && b.m === startM;
                return (
                  <div key={b.key} style={{ width: 68, flexShrink: 0, borderLeft: `1px solid ${C.border}`, minHeight: 30 }}>
                    <div style={{ fontSize: 10, color: isNow ? C.purple : C.textDim, fontWeight: isNow ? 700 : 500, padding: "4px 0 0 5px" }}>{MONTHS_ABBR[b.m]}{isNow ? " •" : ""}</div>
                  </div>
                );
              })}
            </div>
            {/* Event lane */}
            <div style={{ display: "flex", marginTop: 6 }}>
              {buckets.map((b) => (
                <div key={b.key} style={{ width: 68, flexShrink: 0, padding: "0 3px", display: "flex", flexDirection: "column", gap: 4 }}>
                  {b.events.sort((a, z) => parseDate(a.date) - parseDate(z.date)).map((e) => {
                    const isMat = e.type === "Maturity";
                    return (
                      <div key={e.id} onClick={() => setDetail(e.loan)} title={`${e.loan.name} — ${e.type}${e.amount ? " · " + fmt$(e.amount) : ""} — ${fmtDate(e.date)}`}
                        style={{ background: isMat ? "#F1E0DC" : C.purpleSoft, borderLeft: `3px solid ${isMat ? "#B5675A" : C.purple}`, borderRadius: 4, padding: "4px 5px", cursor: "pointer" }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: isMat ? "#8A3E30" : "#5F5280", lineHeight: 1.15, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{e.loan.name}</div>
                        <div style={{ fontSize: 8.5, color: isMat ? "#A15547" : "#7A6D96", marginTop: 1 }}>{new Date(parseDate(e.date)).getDate()} {MONTHS_ABBR[parseDate(e.date).getMonth()]}{e.amount ? " · " + fmt$(e.amount, true) : ""}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 11.5, color: C.textDim }}>
          <span><i style={{ display: "inline-block", width: 9, height: 9, borderRadius: 2, background: "#E0BDB3", marginRight: 6 }} /> Maturity / balloon</span>
          <span><i style={{ display: "inline-block", width: 9, height: 9, borderRadius: 2, background: C.purpleSoft, border: `1px solid ${C.purple}`, marginRight: 6 }} /> Payment step-up</span>
          <span style={{ marginLeft: "auto" }}>Scroll horizontally · click any item for detail</span>
        </div>
      </section>

      <section style={{ ...cardStyle, borderTop: `3px solid ${C.amber}` }}>
        <div style={{ ...kicker, marginBottom: 12 }}>Important Dates Ahead</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {upcoming.map((e) => (
            <div key={e.id} onClick={() => setDetail(e.loan)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: C.deep, borderRadius: 8, borderLeft: `3px solid ${matColor(e.d)}`, cursor: "pointer" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text }}>{e.loan.name} <span style={{ fontSize: 11, fontWeight: 500, color: e.type === "Maturity" ? C.red : C.purple }}>· {e.type}</span></div>
                <div style={{ fontSize: 11.5, color: C.textDim }}>{e.loan.lender || e.loan.borrower || ""}{e.amount ? " · " + fmt$(e.amount) + (e.type === "Payment change" ? " new pmt" : " due") : ""}{e.note ? " · " + e.note : ""}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: matColor(e.d) }}>{fmtDate(e.date)}</div>
                <div style={{ fontSize: 11, color: C.textDim }}>{e.d < 0 ? `${-e.d}d ago` : `in ${e.d}d`}</div>
              </div>
            </div>
          ))}
          {upcoming.length === 0 && <div style={{ fontSize: 13, color: C.textDim }}>No maturities or payment changes in this horizon.</div>}
        </div>
      </section>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search portfolio…" style={{ ...inputStyle, width: 240 }} />
        <div style={{ flex: 1 }} />
        <button onClick={() => setLoans((p) => [{ id: uid(), name: "New Loan", covenants: [], futurePayments: [] }, ...p])} style={btnStyle("primary")}>+ Add loan</button>
      </div>

      <div style={{ ...cardStyle, padding: 0, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
          <thead><tr style={{ borderBottom: `1px solid ${C.border}`, background: C.deep }}>{["Loan", "Lender", "Amount", "Rate", "Monthly pmt", "Maturity", "Type", "Notes", "Doc"].map((h) => <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontFamily: FONT_HEAD, fontSize: 9.5, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.purple, whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((l) => (
              <tr key={l.id} onClick={() => setDetail(l)} style={{ borderBottom: `1px solid ${C.border}`, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = C.deep)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 600, color: C.text }}>{l.name}</td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: C.textDim, whiteSpace: "nowrap" }}>{l.lender || "—"}</td>
                <td style={{ padding: "10px 12px", fontSize: 12.5, color: C.text, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{l.amount ? fmt$(l.amount) : "—"}</td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: C.textDim, whiteSpace: "nowrap" }}>{l.rate != null ? (l.rate * 100).toFixed(2).replace(/\.?0+$/, "") + "%" : "—"}</td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: C.textDim, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{l.paymentAmount ? fmt$(l.paymentAmount) : "—"}</td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: C.textDim, whiteSpace: "nowrap" }}>{l.maturityDate ? fmtDate(l.maturityDate) : "—"}</td>
                <td style={{ padding: "10px 12px", fontSize: 11.5, color: C.textDim, maxWidth: 150 }}>{l.loanType || "—"}</td>
                <td style={{ padding: "10px 12px", fontSize: 11.5, color: C.textDim, maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.notes || "—"}</td>
                <td style={{ padding: "10px 12px", fontSize: 12 }}>{l.docLink ? "📄" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {detail && <LoanDetail loan={detail} onSave={(patch) => { setLoan(detail.id, patch); setDetail({ ...detail, ...patch }); }} onDelete={() => { if (window.confirm("Delete this loan?")) { setLoans((p) => p.filter((x) => x.id !== detail.id)); setDetail(null); } }} onClose={() => setDetail(null)} />}
    </div>
  );
}

function LoanDetail({ loan, onSave, onDelete, onClose }) {
  const [d, setD] = useState({ ...loan, covenants: loan.covenants || [], futurePayments: loan.futurePayments || [] });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const fields = [["name", "Loan name"], ["borrower", "Borrower"], ["lender", "Lender"], ["loanId", "Loan ID"], ["address", "Property address"], ["amount", "Loan amount ($)", "number"], ["rate", "Rate (decimal, e.g. 0.0649)", "number"], ["termMonths", "Term (months)", "number"], ["loanType", "Loan type"], ["startDate", "Start date", "date"], ["maturityDate", "Maturity date", "date"], ["paymentFreq", "Payment frequency"], ["balloon", "Balloon at maturity ($)", "number"], ["paymentAmount", "Current monthly payment ($)", "number"], ["outstanding", "Outstanding balance ($)", "number"], ["prepay", "Prepayment penalties"], ["paymentDue", "Payment due dates"], ["contact", "Point of contact"], ["docLink", "Document link (Drive URL)"]];
  return (
    <Modal onClose={onClose} title={d.name || "Loan"} wide>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* At-a-glance current payment */}
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap", background: C.deep, borderRadius: 8, padding: "12px 16px" }}>
          <div><div style={{ ...kicker, fontSize: 8.5 }}>Loan amount</div><div style={{ fontFamily: FONT_HEAD, fontSize: 20, fontWeight: 700, color: C.text }}>{d.amount ? fmt$(d.amount) : "—"}</div></div>
          <div><div style={{ ...kicker, fontSize: 8.5 }}>Rate</div><div style={{ fontFamily: FONT_HEAD, fontSize: 20, fontWeight: 700, color: C.text }}>{d.rate != null ? (d.rate * 100).toFixed(3).replace(/\.?0+$/, "") + "%" : "—"}</div></div>
          <div><div style={{ ...kicker, fontSize: 8.5 }}>Current monthly payment</div><div style={{ fontFamily: FONT_HEAD, fontSize: 20, fontWeight: 700, color: C.purple }}>{d.paymentAmount ? fmt$(d.paymentAmount) : "—"}</div></div>
          <div><div style={{ ...kicker, fontSize: 8.5 }}>Maturity</div><div style={{ fontFamily: FONT_HEAD, fontSize: 20, fontWeight: 700, color: C.text }}>{d.maturityDate ? fmtDate(d.maturityDate) : "—"}</div></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {fields.map(([k, label, type]) => (
            <Field key={k} label={label}><input type={type || "text"} style={inputStyle} value={d[k] ?? ""} onChange={(e) => set(k, type === "number" ? (e.target.value === "" ? null : Number(e.target.value)) : e.target.value)} /></Field>
          ))}
        </div>
        <Field label="Amortization / structure"><textarea style={{ ...inputStyle, minHeight: 50, resize: "vertical" }} value={d.amortization || ""} onChange={(e) => set("amortization", e.target.value)} /></Field>

        {/* Future payment step-ups */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ ...kicker, fontSize: 9.5 }}>Future payment changes (e.g. IO → P&amp;I)</div>
            <button onClick={() => set("futurePayments", [...(d.futurePayments || []), { id: uid(), date: "", amount: null, note: "" }])} style={{ ...btnStyle("ghost"), padding: "4px 10px" }}>+ Add</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {(d.futurePayments || []).map((fp, i) => (
              <div key={fp.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="date" value={fp.date || ""} onChange={(e) => set("futurePayments", d.futurePayments.map((x, j) => j === i ? { ...x, date: e.target.value } : x))} style={{ ...inputStyle, width: 150, padding: "6px 9px", fontSize: 12 }} />
                <input type="number" value={fp.amount ?? ""} placeholder="New monthly $" onChange={(e) => set("futurePayments", d.futurePayments.map((x, j) => j === i ? { ...x, amount: e.target.value === "" ? null : Number(e.target.value) } : x))} style={{ ...inputStyle, width: 150, padding: "6px 9px", fontSize: 12 }} />
                <input value={fp.note || ""} placeholder="e.g. amortization begins" onChange={(e) => set("futurePayments", d.futurePayments.map((x, j) => j === i ? { ...x, note: e.target.value } : x))} style={{ ...inputStyle, flex: 1, padding: "6px 9px", fontSize: 12 }} />
                <button onClick={() => set("futurePayments", d.futurePayments.filter((_, j) => j !== i))} style={{ border: "none", background: "transparent", color: C.red, cursor: "pointer", fontSize: 16 }}>×</button>
              </div>
            ))}
            {(!d.futurePayments || d.futurePayments.length === 0) && <div style={{ fontSize: 12, color: C.textDim }}>No scheduled payment changes. Add one to flag a step-up (like interest-only converting to principal &amp; interest) — it shows on the calendar and important-dates list.</div>}
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ ...kicker, fontSize: 9.5 }}>Covenants & requirements</div>
            <button onClick={() => set("covenants", [...(d.covenants || []), { id: uid(), text: "", due: "" }])} style={{ ...btnStyle("ghost"), padding: "4px 10px" }}>+ Add</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {(d.covenants || []).map((cv, i) => (
              <div key={cv.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input value={cv.text} onChange={(e) => set("covenants", d.covenants.map((x, j) => j === i ? { ...x, text: e.target.value } : x))} placeholder="e.g. DSCR ≥ 1.25x tested quarterly" style={{ ...inputStyle, flex: 1, padding: "6px 9px", fontSize: 12.5 }} />
                <input type="date" value={cv.due || ""} onChange={(e) => set("covenants", d.covenants.map((x, j) => j === i ? { ...x, due: e.target.value } : x))} style={{ ...inputStyle, width: 140, padding: "6px 9px", fontSize: 12 }} />
                <button onClick={() => set("covenants", d.covenants.filter((_, j) => j !== i))} style={{ border: "none", background: "transparent", color: C.red, cursor: "pointer", fontSize: 16 }}>×</button>
              </div>
            ))}
            {(!d.covenants || d.covenants.length === 0) && <div style={{ fontSize: 12, color: C.textDim }}>No covenants logged.</div>}
          </div>
        </div>
        <Field label="Notes"><textarea style={{ ...inputStyle, minHeight: 60, resize: "vertical" }} value={d.notes || ""} onChange={(e) => set("notes", e.target.value)} /></Field>
        {d.docLink && <a href={d.docLink} target="_blank" rel="noreferrer" style={{ color: C.purple, fontSize: 13, fontWeight: 600 }}>↗ Open loan document</a>}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
          <button onClick={onDelete} style={btnStyle("ghost-danger")}>Delete</button>
          <button onClick={onClose} style={btnStyle("ghost")}>Close</button>
          <button onClick={() => { onSave(d); onClose(); }} style={btnStyle("primary")}>Save loan</button>
        </div>
      </div>
    </Modal>
  );
}

/* ================= PROJECTS (Blue Zones) ================= */
const PROJECT_STAGES = ["Prospecting", "Not started", "Active", "On hold", "Complete"];
function Projects({ projects, setProjects }) {
  const [editing, setEditing] = useState(null);
  const setStage = (id, stage) => setProjects((p) => p.map((x) => x.id === id ? { ...x, stage } : x));
  const { over, handlers } = useDnd(setStage);
  const save = (pr) => { setProjects((p) => p.some((x) => x.id === pr.id) ? p.map((x) => x.id === pr.id ? pr : x) : [...p, pr]); setEditing(null); };
  const del = (id) => { setProjects((p) => p.filter((x) => x.id !== id)); setEditing(null); };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 12.5, color: C.textDim }}>Project pipeline — ad-hoc initiatives that don't roll into the capital target. Drag between stages.</div>
        <button onClick={() => setEditing({ id: uid(), name: "", stage: "Not started", owner: "", targetDate: "", notes: "", tags: [] })} style={btnStyle("primary")}>+ Add project</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10, alignItems: "start" }}>
        {PROJECT_STAGES.map((st) => {
          const col = projects.filter((p) => p.stage === st);
          return (
            <div key={st} {...handlers(st)} style={{ background: over === st ? C.purpleSoft : C.mid, borderRadius: 10, padding: 9, transition: "background .15s", outline: over === st ? `2px dashed ${C.purple}` : "none" }}>
              <div style={{ ...kicker, fontSize: 9, padding: "3px 5px 9px" }}>{st} · {col.length}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7, minHeight: 40 }}>
                {col.map((p) => (
                  <div key={p.id} draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", p.id)} onClick={() => setEditing(p)} style={{ background: C.void_, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 11px", cursor: "grab" }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text }}>{p.name}</div>
                    {p.owner && <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{p.owner}</div>}
                    {p.targetDate && <div style={{ fontSize: 10.5, color: daysUntil(p.targetDate) < 14 ? C.red : C.textDim, marginTop: 4 }}>{fmtDate(p.targetDate)}</div>}
                    {p.tags?.length > 0 && <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>{p.tags.map((t) => <span key={t} style={{ fontSize: 9.5, background: C.purpleSoft, color: "#5F5280", padding: "2px 7px", borderRadius: 99 }}>{t}</span>)}</div>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.name ? "Edit project" : "New project"}>
          <ProjectForm project={editing} onSave={save} onDelete={del} onClose={() => setEditing(null)} />
        </Modal>
      )}
    </div>
  );
}
function ProjectForm({ project, onSave, onDelete, onClose }) {
  const [d, setD] = useState({ ...project, tags: (project.tags || []).join(", ") });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Field label="Project name"><input style={inputStyle} value={d.name} onChange={(e) => set("name", e.target.value)} autoFocus /></Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Stage"><select style={inputStyle} value={d.stage} onChange={(e) => set("stage", e.target.value)}>{PROJECT_STAGES.map((s) => <option key={s}>{s}</option>)}</select></Field>
        <Field label="Owner"><input style={inputStyle} value={d.owner || ""} onChange={(e) => set("owner", e.target.value)} /></Field>
        <Field label="Target date"><input type="date" style={inputStyle} value={d.targetDate || ""} onChange={(e) => set("targetDate", e.target.value)} /></Field>
        <Field label="Tags (comma-separated)"><input style={inputStyle} value={d.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Blue Zones, Partner" /></Field>
      </div>
      <Field label="Notes"><textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={d.notes || ""} onChange={(e) => set("notes", e.target.value)} /></Field>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
        {project.name && <button onClick={() => onDelete(d.id)} style={btnStyle("ghost-danger")}>Delete</button>}
        <button onClick={onClose} style={btnStyle("ghost")}>Cancel</button>
        <button onClick={() => { if (!d.name) return; onSave({ ...d, tags: d.tags.split(",").map((t) => t.trim()).filter(Boolean) }); }} style={btnStyle("primary")}>Save</button>
      </div>
    </div>
  );
}

/* ================= TASK BOARD ================= */
const TASK_COLS = ["Doing", "To Do", "Waiting", "Backlog", "Done"];
function Tasks({ tasks, setTasks }) {
  const [adding, setAdding] = useState(null);
  const setCol = (id, col) => setTasks((p) => p.map((t) => t.id === id ? { ...t, col } : t));
  const { over, handlers } = useDnd(setCol);
  const colColor = { Backlog: "#6E7B93", "To Do": "#B8791F", Doing: "#8B7BA8", Waiting: "#A45248", Done: "#3E7E6C" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 12.5, color: C.textDim }}>Personal task board. Drag cards across columns.</div>
        <button onClick={() => setAdding({ id: uid(), title: "", col: "To Do", date: "" })} style={btnStyle("primary")}>+ New task</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, alignItems: "start" }}>
        {TASK_COLS.map((col) => {
          const items = tasks.filter((t) => t.col === col);
          return (
            <div key={col} {...handlers(col)} style={{ background: over === col ? C.purpleSoft : C.mid, borderRadius: 10, padding: 9, transition: "background .15s", outline: over === col ? `2px dashed ${C.purple}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 5px 9px", alignItems: "center" }}>
                <span style={{ fontFamily: FONT_HEAD, fontSize: 9.5, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: colColor[col] }}>{col} / {items.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7, minHeight: 40 }}>
                {items.map((t) => (
                  <div key={t.id} draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", t.id)} style={{ background: C.void_, border: `1px solid ${C.border}`, borderTop: `2px solid ${colColor[col]}`, borderRadius: 8, padding: "10px 11px", cursor: "grab" }}>
                    <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.4 }}>{t.title}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 7 }}>
                      <span style={{ fontSize: 10.5, color: C.textDim }}>{t.date ? fmtDate(t.date) : ""}</span>
                      <button onClick={() => setTasks((p) => p.filter((x) => x.id !== t.id))} style={{ border: "none", background: "transparent", color: C.textDim, cursor: "pointer", fontSize: 13 }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {adding && (
        <Modal onClose={() => setAdding(null)} title="New task">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Task"><input style={inputStyle} value={adding.title} onChange={(e) => setAdding((a) => ({ ...a, title: e.target.value }))} autoFocus /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Column"><select style={inputStyle} value={adding.col} onChange={(e) => setAdding((a) => ({ ...a, col: e.target.value }))}>{TASK_COLS.map((c) => <option key={c}>{c}</option>)}</select></Field>
              <Field label="Start date"><input type="date" style={inputStyle} value={adding.date || ""} onChange={(e) => setAdding((a) => ({ ...a, date: e.target.value }))} /></Field>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={() => setAdding(null)} style={btnStyle("ghost")}>Cancel</button>
              <button onClick={() => { if (adding.title) { setTasks((p) => [...p, adding]); setAdding(null); } }} style={btnStyle("primary")}>Add task</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ================= GOAL SETTINGS ================= */
function GoalSettings({ target, windowStart, windowEnd, onSave, onClose }) {
  const [t, setT] = useState(target); const [ws, setWs] = useState(windowStart); const [we, setWe] = useState(windowEnd);
  const presets = [["$50M by 2026 EOY", 50000000, "2025-01-01", "2026-12-31"], ["$50M through 2027, from 2026", 50000000, "2026-01-01", "2027-12-31"], ["$100M through 2027, from 2026", 100000000, "2026-01-01", "2027-12-31"]];
  const valid = t > 0 && ws && we && ws < we;
  return (
    <Modal onClose={onClose} title="Goal settings">
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Target ($)"><input type="number" step="1000000" style={inputStyle} value={t} onChange={(e) => setT(Number(e.target.value))} /></Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Window start"><input type="date" style={inputStyle} value={ws} onChange={(e) => setWs(e.target.value)} /></Field>
          <Field label="Window end (deadline)"><input type="date" style={inputStyle} value={we} onChange={(e) => setWe(e.target.value)} /></Field>
        </div>
        <p style={{ margin: 0, fontSize: 12.5, color: C.textDim, lineHeight: 1.6 }}>Only capital closed on or after the window start counts toward the target; pace metrics run from that date.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{presets.map(([label, pt, pws, pwe]) => <button key={label} onClick={() => { setT(pt); setWs(pws); setWe(pwe); }} style={{ border: `1px solid ${C.border}`, background: C.deep, borderRadius: 99, fontSize: 11.5, padding: "5px 11px", cursor: "pointer", color: C.textDim, fontFamily: FONT_BODY }}>{label}</button>)}</div>
        {!valid && <div style={{ fontSize: 12.5, color: C.red }}>Target must be positive and end after start.</div>}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
          <button onClick={onClose} style={btnStyle("ghost")}>Cancel</button>
          <button onClick={() => valid && onSave({ target: t, windowStart: ws, windowEnd: we })} disabled={!valid} style={{ ...btnStyle("primary"), opacity: valid ? 1 : 0.5 }}>Save goal</button>
        </div>
      </div>
    </Modal>
  );
}

/* ================= BACKUP ================= */
function BackupModal({ state, onRestore, onClose }) {
  const fileRef = useRef();
  const download = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `foc-capital-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click();
    URL.revokeObjectURL(url);
  };
  const restore = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { try { const data = JSON.parse(reader.result); if (window.confirm("Replace all current data with this backup?")) onRestore(migrate(data)); } catch { window.alert("That file isn't a valid backup."); } };
    reader.readAsText(file);
  };
  return (
    <Modal onClose={onClose} title="Backup & restore">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ margin: 0, fontSize: 13.5, color: C.textDim, lineHeight: 1.6 }}>Your data auto-saves as you work. For an independent safety net, download a full backup file anytime — every deal, lender, loan, project, and task in one JSON. Keep it in Google Drive or anywhere safe. If the site ever breaks, restore from that file in one step.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={download} style={btnStyle("primary")}>⤓ Download backup file</button>
          <button onClick={() => fileRef.current.click()} style={btnStyle("ghost")}>⤒ Restore from file</button>
          <input ref={fileRef} type="file" accept="application/json" onChange={restore} style={{ display: "none" }} />
        </div>
        <div style={{ background: C.deep, borderRadius: 8, padding: "12px 14px", fontSize: 12.5, color: C.textDim, lineHeight: 1.6 }}>
          <b style={{ color: C.text }}>In the deployed version</b>, connecting your Google account (admin mode) adds automatic timestamped snapshots to a Drive folder, so backups happen without you thinking about it. This download button always works regardless, with zero setup or login.
        </div>
      </div>
    </Modal>
  );
}

/* ================= ROOT ================= */
const EDITOR_PASSCODE = import.meta.env.VITE_EDITOR_PASSCODE || "";

export default function App() {
  const [canEdit, setCanEdit] = useState(() => !EDITOR_PASSCODE || sessionStorage.getItem("foc_edit") === "1");
  const [state, setState] = useState(null);
  const [tab, setTab] = useState("overview");
  const [editingDeal, setEditingDeal] = useState(null);
  const [showGoal, setShowGoal] = useState(false);
  const [showBackup, setShowBackup] = useState(false);
  const [closingFor, setClosingFor] = useState(null);
  const [saveMsg, setSaveMsg] = useState("");
  const saveTimer = useRef(null); const loaded = useRef(false);
  const canEditRef = useRef(canEdit);
  useEffect(() => { canEditRef.current = canEdit; }, [canEdit]);

  useEffect(() => {
    (async () => {
      let data = null;
      try { const raw = await loadState(); if (raw) data = migrate(raw); }
      catch (e) { console.error("Load failed:", e); setSaveMsg("Couldn't reach shared storage — showing workbook data"); }
      setState(data || freshState());
      loaded.current = true;
    })();
  }, []);
  // Viewers poll for the editor's latest saved state.
  useEffect(() => {
    if (!canEdit) {
      return subscribeState((s) => { if (s) setState(migrate(s)); });
    }
  }, [canEdit]);
  useEffect(() => {
    if (!loaded.current || !state || !canEdit) return;
    setSaveMsg("Saving…"); clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try { await saveState(state); setSaveMsg(storageMode === "shared" ? "Saved · shared" : "Saved · this browser"); setTimeout(() => setSaveMsg(""), 1800); }
      catch (e) { console.error("Save failed:", e); setSaveMsg("Save failed — download a backup"); }
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [state, canEdit]);

  const editSet = useCallback((updater) => {
    if (!canEditRef.current) { setSaveMsg("View only — unlock to edit"); setTimeout(() => setSaveMsg(""), 1800); return; }
    setState(updater);
  }, []);
  const setPipeline = useCallback((fn) => editSet((s) => ({ ...s, pipeline: typeof fn === "function" ? fn(s.pipeline) : fn })), [editSet]);
  const setCanvasses = useCallback((fn) => editSet((s) => ({ ...s, canvasses: typeof fn === "function" ? fn(s.canvasses) : fn })), [editSet]);
  const setLoans = useCallback((fn) => editSet((s) => ({ ...s, loans: typeof fn === "function" ? fn(s.loans) : fn })), [editSet]);
  const setProjects = useCallback((fn) => editSet((s) => ({ ...s, projects: typeof fn === "function" ? fn(s.projects) : fn })), [editSet]);
  const setTasks = useCallback((fn) => editSet((s) => ({ ...s, tasks: typeof fn === "function" ? fn(s.tasks) : fn })), [editSet]);
  const setClosings = useCallback((fn) => editSet((s) => ({ ...s, closings: typeof fn === "function" ? fn(s.closings) : fn })), [editSet]);
  const buildingsList = useMemo(() => (state ? [...new Set(state.pipeline.map((p) => p.building).filter(Boolean))].sort() : []), [state]);

  const saveDeal = (d) => {
    editSet((s) => {
      const exists = s.pipeline.some((x) => x.id === d.id);
      const pipeline = exists ? s.pipeline.map((x) => x.id === d.id ? d : x) : [d, ...s.pipeline];
      let loans = s.loans;
      const wasClosed = exists && s.pipeline.find((x) => x.id === d.id)?.status === "Closed";
      if (d.status === "Closed" && d.type === "Financing" && !wasClosed && (d.comps?.loan)) {
        if (!loans.some((l) => l.sourceDealId === d.id)) {
          loans = [{ id: uid(), sourceDealId: d.id, name: d.name, amount: d.comps.loan, startDate: d.dateClosed, covenants: [], notes: "Auto-created from closed financing deal." }, ...loans];
        }
      }
      return { ...s, pipeline, loans };
    });
    setEditingDeal(null);
  };
  const deleteDeal = (id) => { setPipeline((p) => p.filter((x) => x.id !== id)); setEditingDeal(null); };

  if (!state) return <div style={{ minHeight: "100vh", background: C.deep, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_BODY, color: C.textDim }}>Loading capital markets data…</div>;

  const tabs = [["overview", "Overview"], ["pipeline", "Pipeline"], ["leasing", "Leasing"], ["financing", "Financing"], ["loans", "Loan Tracker"], ["projects", "Blue Zones"], ["tasks", "Tasks"]];
  const currentClosing = closingFor ? state.closings[closingFor.id] : null;

  return (
    <div style={{ minHeight: "100vh", background: C.deep, fontFamily: FONT_BODY, color: C.text }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Archivo:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; } select:focus, input:focus, textarea:focus, button:focus-visible { outline: 2px solid ${C.purple}; outline-offset: 1px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }`}</style>

      <header style={{ background: C.text, position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "13px 20px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 17, letterSpacing: "-0.03em", color: "#fff" }}>FUTURE OF CITIES</span>
            <span style={{ fontFamily: FONT_HEAD, fontSize: 7.5, fontWeight: 400, letterSpacing: "0.28em", textTransform: "uppercase", color: C.teal }}>Regenerative Placemaking · Capital Markets</span>
          </div>
          <nav style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {tabs.map(([k, label]) => <button key={k} onClick={() => setTab(k)} style={{ border: "none", background: tab === k ? "rgba(166,220,205,0.15)" : "transparent", color: tab === k ? C.teal : "rgba(255,255,255,0.65)", fontWeight: 600, fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", padding: "8px 12px", borderRadius: 6, cursor: "pointer", fontFamily: FONT_BODY }}>{label}</button>)}
          </nav>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 11.5, color: saveMsg.includes("failed") ? "#E8B4AC" : "rgba(255,255,255,0.5)", minWidth: 48, textAlign: "right" }}>{saveMsg}</span>
          <button onClick={() => setShowBackup(true)} title="Backup & restore" style={{ border: "1.5px solid rgba(166,220,205,0.35)", background: "transparent", color: C.teal, borderRadius: 6, padding: "6px 12px", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: FONT_BODY }}>Backup</button>
          {EDITOR_PASSCODE && (canEdit ? (
            <button onClick={() => { sessionStorage.removeItem("foc_edit"); setCanEdit(false); }} title="Switch to view-only" style={{ border: "1.5px solid rgba(166,220,205,0.5)", background: "rgba(166,220,205,0.15)", color: C.teal, borderRadius: 6, padding: "6px 12px", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: FONT_BODY }}>● Editing</button>
          ) : (
            <button onClick={() => { const pw = window.prompt("Enter editor passcode:"); if (pw == null) return; if (pw === EDITOR_PASSCODE) { sessionStorage.setItem("foc_edit", "1"); setCanEdit(true); } else window.alert("Incorrect passcode."); }} title="Unlock editing" style={{ border: "1.5px solid rgba(255,255,255,0.25)", background: "transparent", color: "rgba(255,255,255,0.8)", borderRadius: 6, padding: "6px 12px", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: FONT_BODY }}>View only · Unlock</button>
          ))}
        </div>
      </header>

      {EDITOR_PASSCODE && !canEdit && (
        <div style={{ background: C.purpleSoft, borderBottom: `1px solid ${C.border}`, textAlign: "center", padding: "7px 16px", fontSize: 12.5, color: "#5F5280" }}>
          Viewing the live dashboard (read-only). Numbers refresh automatically. Use “Unlock” in the header to edit.
        </div>
      )}
      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 20px 60px" }}>
        {tab === "overview" && <Overview pipeline={state.pipeline} target={state.target} windowStart={state.windowStart} windowEnd={state.windowEnd} onOpenDeal={setEditingDeal} onEditGoal={() => setShowGoal(true)} />}
        {tab === "pipeline" && <Pipeline pipeline={state.pipeline} setPipeline={setPipeline} onOpenDeal={setEditingDeal} />}
        {tab === "leasing" && <Leasing pipeline={state.pipeline} setPipeline={setPipeline} onOpenDeal={setEditingDeal} />}
        {tab === "financing" && <Financing canvasses={state.canvasses} setCanvasses={setCanvasses} closings={state.closings} setClosings={setClosings} onOpenClosing={(id, name) => setClosingFor({ id, name })} />}
        {tab === "loans" && <LoanTracker loans={state.loans} setLoans={setLoans} />}
        {tab === "projects" && <Projects projects={state.projects} setProjects={setProjects} />}
        {tab === "tasks" && <Tasks tasks={state.tasks} setTasks={setTasks} />}
      </main>

      {editingDeal && <DealEditor deal={editingDeal} buildings={buildingsList} onSave={saveDeal} onDelete={deleteDeal} onClose={() => setEditingDeal(null)} />}
      {showGoal && <GoalSettings target={state.target} windowStart={state.windowStart} windowEnd={state.windowEnd} onSave={(g) => { editSet((s) => ({ ...s, ...g })); setShowGoal(false); }} onClose={() => setShowGoal(false)} />}
      {showBackup && <BackupModal state={state} onRestore={(data) => { setState(data); setShowBackup(false); }} onClose={() => setShowBackup(false)} />}
      {closingFor && <ClosingProcess trackId={closingFor.id} trackName={closingFor.name} closing={currentClosing} setClosing={(c) => setClosings((cl) => ({ ...cl, [closingFor.id]: c }))} onClose={() => setClosingFor(null)} />}
    </div>
  );
}
