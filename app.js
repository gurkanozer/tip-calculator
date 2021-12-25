const bill = document.getElementById("bill");
const tips = document.getElementsByName("tip");
const customTip = document.getElementById("custom-tip");
const numberOfPeople = document.getElementById("nop");
const tipAmount = document.getElementsByClassName("tip-amount-value");
const totalAmount = document.getElementsByClassName("total-amount-value");
const percentageContainerAll = document.querySelectorAll(".percentage__container");
const btnReset = document.querySelector(".btn-reset");
class Tip {
    constructor(tipRate, bill, persons){
        this.tipRate = tipRate;
        this.bill = bill;
        this.persons = persons;
        this.tip = 0.00;
        this.total = 0.00;
    }
    getTipRate(){
        return this.tipRate;
    }
    setTipRate(tipRate){
        if(this.isNumber(tipRate))
            this.tipRate = Number(tipRate);
        else this.tipRate = null; 
    }
    getBill(){
        return this.bill;
    }
    setBill(bill){
        if(this.isNumber(bill))
            this.bill = Number(bill); 
        else this.bill = null;
    }
    
    getPersons(){
        return this.persons;
    }
    setPersons(persons){
        if(this.isNumber(persons))
            this.persons = Number(persons);
        else this.persons = null; 
    }

    getTotal(){
        return this.total;
    }
    getTip(){
        return this.tip;
    }
    isNumber(value){
        return /^\d*\.?\d*$/.test(value);
    }
    calcAmount(){
        if(this.tipRate > 0 && this.bill > 0 && this.persons > 0 )
        {
            this.tip = (( this.bill / this.persons ) * (this.tipRate / 100)).toFixed(2);
            this.total = (Number((this.bill / this.persons).toFixed(2)) + Number(this.tip)).toFixed(2);
        }
    }
    clear(){
        this.tipRate = null;
        this.bill = null;
        this.persons = null;
        this.tip = 0.00;
        this.total = 0.00;
    }
}
//Set radio buttons active state
percentageContainerAll.forEach(pc =>{
    pc.addEventListener("click", () => {
        percentageContainerAll.forEach(pc2 => {
            pc2.classList.remove("active");
        });
        pc.classList.add("active");
    });
});
const tip = new Tip();
//Set selected Tip Rate
//is any defined rate is selected
tips.forEach(tp=>{
    tp.addEventListener("click", () =>{
        tip.setTipRate(tp.value);
        tip.calcAmount();
        totalAmount[0].innerHTML = tip.getTotal();
        tipAmount[0].innerHTML = tip.getTip();

    });
});
//is custom rate is selected
customTip.addEventListener("input",e=>{
    tip.setTipRate(e.target.value);
    tip.calcAmount();
    totalAmount[0].innerHTML = tip.getTotal();
    tipAmount[0].innerHTML = tip.getTip();
});
bill.addEventListener("input",e=>{
    tip.setBill(e.target.value);
    tip.calcAmount();
    totalAmount[0].innerHTML = tip.getTotal();
    tipAmount[0].innerHTML = tip.getTip();
});
numberOfPeople.addEventListener("input", e=> {
    tip.setPersons(e.target.value);
    tip.calcAmount();
    totalAmount[0].innerHTML = tip.getTotal();
    tipAmount[0].innerHTML = tip.getTip();
});
btnReset.addEventListener("click", () => {
    tip.clear();
    bill.value = null;
    customTip.value = null;
    numberOfPeople.value = null;
    percentageContainerAll.forEach(pc2 => {
        pc2.classList.remove("active");
    });
    totalAmount[0].innerHTML = "0.00";
    tipAmount[0].innerHTML = "0.00";
});