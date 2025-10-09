export default class Validators{
    static valid_name = (name) => {
        const str = name.trim();
        return str.length < 3 ? false: name
    }

    static valid_number = (number) => {
        const num = number.replace(/\s/g, "");
        if(num.length === 11){
            const n = Number(num);
            if (Number.isInteger(n))
                return num;
        }
        return false;
    }
    static duplicate_name(name, base){
        return base.find(n => n.name.toUpperCase() === name.toUpperCase());
    }
}