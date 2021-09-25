import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormFieldError } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() public group: FormGroup;
  @Input() public label: string = '';
  @Input() public type: string = 'file';
  @Input() public fieldName: string = '';
  @Input() public class: string = '';
  @Input() public isNewDesing: boolean = false;
  @Input() public isRequired: boolean = false;
  @Input() public errors: FormFieldError[] = [];
  @Input() public isImage: boolean = true;
  @Output() public cstChange = new EventEmitter<any>();

  base64StringData = '';

  constructor(private fb: FormBuilder) {
    this.group = this.fb.group({});
  }

  ngOnInit(): void {
    this.class = `${this.fieldName} ${this.class}`;
    const validators = [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    this.groupControl?.setValidators(validators);
    this.groupControl?.updateValueAndValidity();
  }

  get groupControl(): AbstractControl | null {
    return this.group.get(this.fieldName);
  }

  uploadImage(fileInput: any) {
    console.log('evnt chnag');
   // console.log(fileInput);
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        
          // const image = new Image();
        //  image.src = e.target.result;
          this.base64StringData = e.target.result;
        //   image.onload = (rs) => {
        //       //const img_height = rs.currentTarget['height'];
        //      // const img_width = rs.currentTarget['width'];
        //   const imgBase64Path = e.target.result;
        //   cardImageBase64 = imgBase64Path;
        //  // this.isImageSaved = true;
        //           // this.previewImagePath = imgBase64Path;
        //   };
        console.log('base 64 data: ' + this.base64StringData);
        this.cstChange.emit(this.base64StringData);
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }


}
