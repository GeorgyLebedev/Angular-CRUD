import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MainState} from "../../../store/main.state";
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'input-cell',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit {
  constructor(private HttpService: HttpService, private MainState: MainState) {
  }

  @Input() column: string
  @Input() value: any
  @Output() inputUpdate = new EventEmitter<any>()
  elementType: string
  selectList: string[]
  adjacentData: any
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  async getElementType() {
    const pattern = /^[a-zA-Z]*Code$/;
    if (pattern.test(this.column)) {
      this.adjacentData = await this.HttpService.getAll(this.getAdjacentTableName())
      console.log(this.adjacentData)
      if (this.adjacentData.every((element:Object|string)=> typeof element==='string')) {
        this.MainState.setError(new Error(`Данные не могут быть добавлены, так как смежная таблица ${this.getAdjacentTableName()} пуста!`))
        return
      }
      this.selectList = []
      this.adjacentData.forEach((el: Object) => {
        let stringValue = Object.values(el).join(', ')
        this.selectList.push(
          stringValue.length > 100 ?
            stringValue.substring(0, 100) + '...' :
            stringValue)
      })
      this.elementType = 'select'
      return
    }
    switch (this.column) {
      case 'gender':
        this.elementType = "select"
        this.selectList = ['м', 'ж']
        break
      case 'photo':
        this.elementType = 'file'
        break
      default:
        this.elementType = 'input'
    }
  }

  getAdjacentTableName() {
    return this.column.substring(0, this.column.indexOf("Code"))
  }

  getInputType(column: string): string {
    if (column.includes('phone')) return 'tel'
    else if (column.includes('email')) return 'email'
    else if (column.startsWith('is') && column.charAt(2) === column.charAt(2).toUpperCase()) return 'checkbox'
    else if (column.includes('photo')) return 'file'
    else if (column.includes('price') || column.includes('quantity')) return 'number'
      else if(column.toLowerCase().includes('date')) return 'datetime-local'
    else return 'text'
  }

  isHiddenColumn(column: string): boolean {
    return column === 'code'
  }

  openExplorer() {
    this.fileInput.nativeElement.click()
  }

  loadPhoto(event: any) {
    const file: File = event.target.files[0]
    const maxSize = 500 * 1000
    if (file.size > maxSize) {
      this.fileInput.nativeElement.value = ""
      this.MainState.setError(new Error("Размер изображения не должен превышать 500 КБ!"))
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.value = reader.result?.toString()
      this.updateEntity()
    };
  }

  updateEntity() {
    if(Number(this.value))
      this.value=Number(this.value)
    this.inputUpdate.emit({[this.column]:this.value})
  }

  async ngOnInit() {
    await this.getElementType()
  }

}
