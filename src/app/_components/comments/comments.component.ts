import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task, Project, Comment } from '../../_models';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CommentService } from '../../_services';
import { NgFlashMessageService } from 'ng-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html'
})

export class CommentsComponent implements OnInit {
  commentForm: FormGroup;
  @Input() task: Task;
  @Input() project: Project;
  @Input() commentCount: number;
  @Input() modalRef: BsModalRef;
  @Output() updateCommentCount: EventEmitter<number> = new EventEmitter();

  comments: Comment[];
  filePreview: any = '';
  selectedFile: any;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
        title: ['', Validators.compose([
            Validators.required, 
            Validators.minLength(10),
            Validators.maxLength(255)
        ])]
    });

    this.commentService.getAll(this.project, this.task)
        .subscribe( 
          comments => {
            this.comments = comments.data;
          },
          errors => {
              this.ngFlashMessageService.showFlashMessage({
                    messages: [errors[0]],
                    dismissible: true, 
                    timeout: false,
                    type: 'danger'
              }) 
          });
  }

  get f() { return this.commentForm.controls; }

  onSubmit() {
    if (this.commentForm.invalid) {
        return;
    }
    
    var formData = new FormData();
    formData.append('comment[title]', this.f.title.value);

    if(this.selectedFile){
      formData.append('comment[attachment]', this.selectedFile); 
    } 

    this.createComment(formData);
  }

  previewFile(el) {
    var reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      this.filePreview = reader.result;
    }
    
    this.selectedFile = el.files[0];
    reader.readAsDataURL(el.files[0]);
  }

  onDelete(comment: Comment) {
    this.commentService.delete(this.project, this.task, comment.id).pipe(first()).subscribe(c => {
      let index = this.comments.indexOf(comment);
      this.comments.splice(index, 1);
      this.commentCount = this.commentCount - 1;
      this.updateCommentCount.emit(this.commentCount);
    });
  }

  private createComment(options) {
    this.commentService.create(this.project, this.task, options)
        .subscribe(comment => {
            this.comments.push(comment.data);
            this.commentCount = this.commentCount + 1;
            this.updateCommentCount.emit(this.commentCount);
            this.commentForm.reset();
            this.selectedFile = '';
            this.filePreview = '';

         }, errors => 
               this.ngFlashMessageService.showFlashMessage({
                    messages: [errors[0]], 
                    dismissible: true, 
                    timeout: false,
                    type: 'danger'
                })
        );

  }
}  