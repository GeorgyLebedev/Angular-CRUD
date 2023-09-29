import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MainState} from "../../../store/main_state";
@Component({
  selector: 'input-cell',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit{
  constructor(private MainState: MainState) {
  }
  @Input() column: string
  @Input() value: any
  @Output() inputUpdate=new EventEmitter<any>()
  elementType:string
  selectList:string[]
  imgSrc:string|undefined
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  getElementType(){
    if(this.column=='gender') {
      this.elementType = "select"
      this.selectList=[]
      this.selectList.push('м')
      this.selectList.push('ж')
    }
    else if(this.column=='photo')
      this.elementType='file'
    else
      this.elementType='input'
  }

  getInputType(column: string): string {
    if (column.includes('phone')) return 'tel'
    else if (column.includes('email')) return 'email'
    else if (column.startsWith('is') && column.charAt(2) === column.charAt(2).toUpperCase()) return 'checkbox'
    else if (column.includes('photo')) return 'file'
    else if (column.includes('price') || column.includes('quantity')) return 'number'
    else return 'text'
  }

  isDisabledColumn(column: string): boolean {
    return column === 'code' || column.toLowerCase().includes('date');
  }
  openExplorer(){
    this.fileInput.nativeElement.click()
  }
  loadPhoto(event:any){
    const file:File=event.target.files[0]
    const maxSize=500*1000
    if(file.size>maxSize){
      this.fileInput.nativeElement.value=""
      this.MainState.setError(new Error("Размер изображения не должен превышать 500 КБ!"))
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgSrc = reader.result?.toString();
      this.value['photo']=this.imgSrc
      this.updateEntity()
    };
  }
  updateEntity(){
    this.inputUpdate.emit(this.value)
  }
  ngOnInit() {
    this.getElementType()
  }

}
