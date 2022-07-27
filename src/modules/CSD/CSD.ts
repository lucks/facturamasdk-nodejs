import Serializable from "../../abstractions/Serializable";

export default class CSD implements Serializable {
    public Rfc: string;
    public Certificate: string;
    public PrivateKey: string;
    public PrivateKeyPassword: string;

    constructor(csd: any) {
        this.Rfc = csd.Rfc;
        this.Certificate = csd.Certificate;
        this.PrivateKey = csd.PrivateKey;
        this.PrivateKeyPassword = csd.PrivateKeyPassword;
    }

    public json(): any {
        return {
            Rfc: this.Rfc,
            Certificate: this.Certificate,
            PrivateKey: this.PrivateKey,
            PrivateKeyPassword: this.PrivateKeyPassword
        }
    }
}
