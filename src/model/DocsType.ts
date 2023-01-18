export class DocsType {
    key: string;
    type: ['author'];
    name: string;
    alternate_names: string[];
    birth_date: number;
    death_date: number;
    top_work: string;
    work_count: number;
    top_subjects: string[];
    _version_: number;


    constructor(key: string, type: ["author"], name: string, alternate_names: string[], birth_date: number, death_date: number, top_work: string, work_count: number, top_subjects: string[], version_: number) {
        this.key = key;
        this.type = type;
        this.name = name;
        this.alternate_names = alternate_names;
        this.birth_date = birth_date;
        this.death_date = death_date;
        this.top_work = top_work;
        this.work_count = work_count;
        this.top_subjects = top_subjects;
        this._version_ = version_;
    }
}