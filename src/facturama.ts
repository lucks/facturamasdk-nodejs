import {Config} from "./config";
import {CFDIApi} from "./modules/CFDI";
import CSDApi from "./modules/CSD/CSDApi";
import CatalogsApi from "./modules/Catalog/CatalogsApi";
import {Client} from "./client/Client";
import {encodeBase64} from "./util/base64";
import {ClientConfig} from "./client/ClientConfig";

export default class FacturamaSDK {

    private _apiUrl: string;

    private _CDFI: CFDIApi | null = null;
    private _CSD: CSDApi | null = null;
    private _Catalogs: CatalogsApi | null = null;

    private loggedIn: boolean = false;

    public get CDFI(): CFDIApi {
        if ( this.loggedIn && this._CDFI )
            return this._CDFI;
        else
            throw Error('You need to call login method with username and password first');

    };

    public get CSD(): CSDApi {
        if ( this.loggedIn && this._CSD )
            return this._CSD;
        else
            throw Error('You need to call login method with username and password first');

    };

    public get Catalogs(): CatalogsApi {
        if ( this.loggedIn && this._Catalogs )
            return this._Catalogs;
        else
            throw Error('You need to call login method with username and password first');

    };


    constructor(production: boolean = false, apiUrl?: string) {
        if (apiUrl) {
            this._apiUrl = apiUrl;
        } else {
            if (production)
                this._apiUrl = Config.production.apiUrl;
            else
                this._apiUrl = Config.sandbox.apiUrl;
        }
    }

    public login(username: string, password: string) {
        const authorization = encodeBase64(username + ':' + password);
        const clientConfig = <ClientConfig>{
            url: this._apiUrl,
            authorization: 'Basic ' + authorization
        };
        this._CDFI = new CFDIApi(clientConfig);
        this._CSD = new CSDApi(clientConfig);
        this._Catalogs = new CatalogsApi(clientConfig);

        this.loggedIn = true;
    }

}
