import { Observable } from 'rxjs';
import { Confirmation } from './confirmation';
export declare class ConfirmationService {
    private requireConfirmationSource;
    private acceptConfirmationSource;
    requireConfirmation$: Observable<Confirmation>;
    accept: Observable<Confirmation>;
    confirm(confirmation: Confirmation): this;
    onAccept(): void;
}
