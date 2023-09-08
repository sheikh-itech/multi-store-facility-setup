import { KeyValue } from "@angular/common";
import { DatePipe } from '@angular/common';
import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
class Utility {

    constructor(private datePipe: DatePipe) { }

    public static scrollTop(): void {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    public static originalOrder(firstVal: KeyValue<number, unknown>, secondVal: KeyValue<number, unknown>): number {
        return 0;
    }

    /**
     * @param updatedObject- This is edited/updated copy of originalObject
     * @param originalObject- Original object without any update
     * @param ignoreKeys- Keys to be ignored [Array of keys]
     * @param outcome- This is only for internal use [Don't pass it or always pass empty object]
     * @param prevkey- This is only for internal use
     * @returns new object [data difference] by comparing updatedObject to originalObject
     */
    public static buildObjectsDifference(updatedObject: any, originalObject: any,
        ignoreKeys: any = [], outcome: any = {}, prevkey: string = ""): any {

        Object.keys(updatedObject).forEach(key => {

            if (!ignoreKeys.includes(key)) {
                if (Array.isArray(updatedObject[key]))
                    outcome[key] = updatedObject[key];
                else
                    if (typeof updatedObject[key] === 'object') {

                        if (typeof originalObject[key] === 'object') {
                            this.buildObjectsDifference(updatedObject[key], originalObject[key],
                                ignoreKeys, outcome, key);
                        }
                        else if (prevkey != "") {
                            if (!outcome[prevkey])
                                outcome[prevkey] = {};
                            outcome[prevkey][key] = updatedObject[key];
                        } else
                            outcome[key] = updatedObject[key];
                    } else
                        if (updatedObject[key] != originalObject[key] && prevkey != "") {
                            if (!outcome[prevkey])
                                outcome[prevkey] = {};
                            outcome[prevkey][key] = updatedObject[key];
                        } else if (updatedObject[key] != originalObject[key])
                            outcome[key] = updatedObject[key];
            }
        });

        return outcome;
    }

    /**
     * @param updatedObject- This is edited/updated copy of originalObject
     * @param originalObject- Original object without any update
     * @returns If both objects equal then true otherwise false
     */
    public static checkObjectsEquality(updatedObject: any, originalObject: any): boolean {

        let outcome = true;

        if (Object.keys(updatedObject).length != Object.keys(originalObject).length)
            return false;

        Object.keys(updatedObject).forEach(key => {
            if (updatedObject[key] != originalObject[key])
                outcome = false;
        });

        return outcome;
    }

    /**
     * @param updatedObject- This is edited/updated copy of originalObject
     * @param originalObject- Original object without any update
     * @param ignoreKeys- Keys to be ignored [Array of keys]
     * @param outcome- This is only for internal use [Don't pass it or always pass true]
     * @returns If both objects equal then true otherwise false
     */
    public static deepObjectsEquality(updatedObject: any, originalObject: any,
        ignoreKeys: any = [], outcome: boolean = true): boolean {

        if (!outcome)
            return outcome;

        if (!originalObject && !updatedObject)
            return outcome;

        if (!originalObject || !updatedObject)
            return !outcome;

        Object.keys(updatedObject).forEach(key => {

            if (!ignoreKeys.includes(key)) {
                if (typeof updatedObject[key] === 'object') {

                    if (typeof originalObject[key] === 'object')
                        outcome = this.deepObjectsEquality(updatedObject[key], originalObject[key],
                            ignoreKeys, outcome);
                    else
                        outcome = false;
                } else
                    if (updatedObject[key] != originalObject[key])
                        outcome = false;
            }
        });

        return outcome;
    }

    public yyyyMM(dateString: string): string {

        return String(this.datePipe.transform(dateString, 'yyyy-MM'));
    }

    public yyyyMMdd(dateString: string): string {

        return String(this.datePipe.transform(dateString, 'yyyy-MM-dd'));
    }

    public ddMMMyyyy(dateString: string): string {

        return String(this.datePipe.transform(dateString, 'dd-MMM-yyyy'));
    }
    public ddmmyyyy(dateString: string): string {

        return String(this.datePipe.transform(dateString, 'dd-MM-yyyy'));
    }

    public ddMMMyyyyHMS(dateString: string): string {

        return String(this.datePipe.transform(dateString, 'dd-MM-yyyy h:m:s'));
    }

    public yyyyMMddHMS(dateString: string): string {

        return String(this.datePipe.transform(dateString, 'yyyy-MM-dd h:m:s'));
    }

    public mmmYY(dateString: string): string {

        return String(this.datePipe.transform(dateString, 'MMM yy'));
    }
}

export { Utility }
