import { HandleOutput, argSet } from "../tools/handleOutput"
import { autoConn } from "../tools/autoConnect"

export interface categoryBase {
    resWords: string[];
    chsWords: string[];
    currentChoice: argSet;
}

export class VnMethod extends HandleOutput implements categoryBase {
    innerWords: string[] = ["titles.lang","titles.title","titles.official","image.url","developers.original","developers.name"];
    resWords: string[] = ["id","aliases","devstatus","released","platforms","average","rating","length"];
    chsWords: string[] = ["vndb唯一id","别称","开发状态","发布日期","支持平台","平均分","贝叶斯评分","文本长度（1-5）"];
    miniOptions: number[] = [2,3,4,5];
    currentChoice: argSet = {
        argSourceArr: [],
        argChsArr: [],
        argConnSymbol: "、",
        kindKey2Value: [],
        kindkey2Arr: []
    };

    constructor (_scheme: number) {
        super();
        if (_scheme === 0) {
            const miniArr = this.buildMini();
            this.currentChoice.argSourceArr = miniArr[0];
            this.currentChoice.argChsArr = miniArr[1];
            this.currentChoice.kindKey2Value = [1,3];
            this.currentChoice.kindkey2Arr = [2];
        } else if (_scheme === 1) {
            this.currentChoice.argSourceArr = this.resWords;
            this.currentChoice.argChsArr = this.chsWords;
            this.currentChoice.kindKey2Value = [0,3,5,6,7];
            this.currentChoice.kindkey2Arr = [1,4];
        }
    }

    async run(_scheme: number, _resObj: object): Promise<string> {
        if (_scheme === 0) {
            return this.buildlessCmdStr(_resObj)
        } else if (_scheme === 1) {
            return this.buildMoreCmdStr(_resObj);
        }
    }

    buildMini(): string[][] {
        let miniRes = [];
        let miniChs = [];
        this.miniOptions.forEach(v => {
            miniRes.push(this.resWords[v]);
            miniChs.push(this.chsWords[v]);
        })
        return [miniRes, miniChs]
    }

    buildMoreCmdStr(_resObj: object): string {
        try {
            let handled = "<message forward>";
            const matched: object[] = _resObj["results"];
            matched.forEach((v) => {
                handled += "<message>";
                
                handled += this.ouputCoverImg(v);
                handled += this.outputMoreLangTitles(v);
                handled += autoConn(this.currentChoice, v);
                handled += `开发状态：${this.outputVnVnDevstatus(v)}`;
                handled += this.outputProducersInfo(v);

                handled += "</message>";
            })
                
            return handled + "</message>";
        } catch (e) {
            return String(e);
        }
    }

    buildlessCmdStr(_resObj: object): string {
        try {
            let handled = "<message forward>";
            const matched: object[] = _resObj["results"];
            matched.forEach((v) => {
                handled += "<message>";
                
                handled += this.ouputCoverImg(v);
                handled += this.outputlessLangTitles(v);
                handled += autoConn(this.currentChoice, v);
                handled += this.outputProducersInfo(v);

                handled += "</message>";
            })
                
            return handled + "</message>";
        } catch (e) {
            return String(e);
        }
    }
}

export class ProducerMethod extends HandleOutput implements categoryBase  {
    resWords: string[] = ["id","aliases","lang","type","name","original"];
    chsWords: string[] = ["vndb唯一id","别称","语言","类型",];
    currentChoice: argSet = {
        argSourceArr: [],
        argChsArr: [],
        argConnSymbol: "、",
        kindKey2Value: [],
        kindkey2Arr: []
    };

    constructor () {
        super();
        this.currentChoice.argConnSymbol = "、",
        this.currentChoice.argSourceArr = this.resWords;
        this.currentChoice.argChsArr = this.chsWords;
        this.currentChoice.kindKey2Value = [0,2];
        this.currentChoice.kindkey2Arr = [1];
    }

    async run (_resObj: object): Promise<string> {
        return this.buildCmdStr(_resObj);
    }

    buildCmdStr (_resObj: object): string {
        try {
            let handled = "<message forward>";
            const matched: object[] = _resObj["results"];
            matched.forEach((v) => {
                handled += "<message>";
                
                handled += this.outputProducerName(v);
                handled += `公司类型：${this.outputProducerType(v)}`;
                handled += autoConn(this.currentChoice, v);

                handled += "</message>";
            })
                
            return handled + "</message>";
        } catch (e) {
            return String(e);
        }
    }
}

export class CharacterMethod extends HandleOutput implements categoryBase  {
    innerWords: string[] = ["image.url","gender","vns.alttitle"];
    resWords: string[] = ["id","original","aliases","age","birthday","blood_type","height","weight","bust,waist,hips","cup"];
    chsWords: string[] = ["vndb唯一id","名称","别称","年龄","生日","血型","身高（cm）","体重（kg）","三围","Cup"];
    miniOptions: number[] = [0,1,2,3,4];
    currentChoice: argSet = {
        argSourceArr: [],
        argChsArr: [],
        argConnSymbol: "、",
        kindKey2Value: [],
        kindkey2Arr: []
    };

    constructor (_scheme: number) {
        super();
        if (_scheme === 0) {
            const miniArr = this.buildMini();
            this.currentChoice.argSourceArr = miniArr[0];
            this.currentChoice.argChsArr = miniArr[1];
            this.currentChoice.kindKey2Value = [0,1,3,4];
            this.currentChoice.kindkey2Arr = [2];
        } else if (_scheme === 1) {
            this.currentChoice.argSourceArr = this.resWords;
            this.currentChoice.argChsArr = this.chsWords;
            this.currentChoice.kindKey2Value = [0,1,3,4,5,6,7];
            this.currentChoice.kindkey2Arr = [2];
        }
    }

    async run(_scheme: number, _resObj: object): Promise<string> {
        if (_scheme === 0) {
            return this.buildlessCmdStr(_resObj)
        } else if (_scheme === 1) {
            return this.buildMoreCmdStr(_resObj);
        }
    }

    buildMini(): string[][] {
        let miniRes = [];
        let miniChs = [];
        this.miniOptions.forEach(v => {
            miniRes.push(this.resWords[v]);
            miniChs.push(this.chsWords[v]);
        })
        return [miniRes, miniChs]
    }

    buildMoreCmdStr(_resObj: object): string {
        try {
            let handled = "<message forward>";
            const matched: object[] = _resObj["results"];
            matched.forEach((v) => {
                handled += "<message>";
                
                handled += this.ouputCoverImg(v);
                handled += autoConn(this.currentChoice, v);
                handled += this.outputCharacterGenderMore(v);
                handled += this.outputCharacterVns(v);
                if (v["gender"][0] !== "m") {
                    handled += this.outputCharacterBWH(v);
                    handled += `Cup：${String(v["cup"])}\n`;
                }

                handled += "</message>";
            })
                
            return handled + "</message>";
        } catch (e) {
            return String(e);
        }
    }

    buildlessCmdStr(_resObj: object): string {
        try {
            let handled = "<message forward>";
            const matched: object[] = _resObj["results"];
            matched.forEach((v) => {
                handled += "<message>";
                
                handled += this.ouputCoverImg(v);
                handled += autoConn(this.currentChoice, v);
                handled += this.outputCharacterGenderLess(v);
                handled += this.outputCharacterVns(v);

                handled += "</message>";
            })
                
            return handled + "</message>";
        } catch (e) {
            return String(e);
        }
    }
}
