const isMock = import.meta.env?.IS_MOCK_ACTIVE;

export default class Helper {
    static isTestMode() {

        return isMock === 'true';
    }

    static isEmpty(val) {
        return val === '' || val === null || val === undefined;
    }

    static isNotEmpty(val) {
        return !this.isEmpty(val);
    }

    static isDefined(val) {
        return val !== null && val !== undefined;
    }

    static isNotDefined(val) {
        return !this.isDefined(val);
    }

    static removeSpecialCharsFromString(val) {
        return val?.replace(/[^\w\s]/gi, '');
    }

    static removeBlankSpaceAndSpecialCharsFromString(val) {
        return val?.replace(/[^a-zA-Z0-9]/g, '');
    }

    static allowNameFromString(val) {
        return val.replace(/[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s]/g, '');
    }


    static parseYyyyMmDdToISODate(val) {
        if (val) {
            const [year, day, month] = val?.split('-').map(Number);
            const date = new Date(Date.UTC(year, month - 1, day));
            return date.toISOString();
        }
    }


    static isValidEmail(val) {
        return (
            Helper.isDefined(val) && Helper.isNotEmpty(val) &&
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                val
            )
        );
    }

    static isValidPhone(val) {
        return (
            Helper.isDefined(val) && Helper.isNotEmpty(val) &&
            /^\(?[1-9]{2}\)?\s?9[0-9]{4}-?[0-9]{4}$/
                .test(val)
        );
    }

    static isValidCpf(val) {
        if (!val) return false;
        const cpf = val.toString().replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        const firstCheckDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (parseInt(cpf.charAt(9)) !== firstCheckDigit) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        const secondCheckDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        return parseInt(cpf.charAt(10)) === secondCheckDigit;
    }

    static isValidCnpj(cnpj) {
        if (Helper.isDefined(cnpj) && Helper.isNotEmpty(cnpj)) return false

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14) return false;

        if (
            cnpj === '00000000000000' ||
            cnpj === '11111111111111' ||
            cnpj === '22222222222222' ||
            cnpj === '33333333333333' ||
            cnpj === '44444444444444' ||
            cnpj === '55555555555555' ||
            cnpj === '66666666666666' ||
            cnpj === '77777777777777' ||
            cnpj === '88888888888888' ||
            cnpj === '99999999999999'
        )
            return false;

        let cnpjLength = cnpj.length - 2;
        let cnpjNumbers = cnpj.substring(0, cnpjLength);
        const cnpjDigits = cnpj.substring(cnpjLength);
        let sum = 0;
        let position = cnpjLength - 7;


        for (let i = cnpjLength; i >= 1; i--) {
            sum += Number(cnpjNumbers.charAt(cnpjLength - i)) * position--;
            if (position < 2) position = 9;
        }

        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result.toString() !== cnpjDigits.charAt(0)) return false;

        cnpjLength = cnpjLength + 1;
        cnpjNumbers = cnpj.substring(0, cnpjLength);
        sum = 0;
        position = cnpjLength - 7;

        for (let i = cnpjLength; i >= 1; i--) {
            sum += Number(cnpjNumbers.charAt(cnpjLength - i)) * position--;
            if (position < 2) position = 9;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result.toString() !== cnpjDigits.charAt(1)) return false;

        return true;
    }


}


