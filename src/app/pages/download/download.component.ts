import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from 'src/app/services/api.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadPageComponent implements OnInit {

  private sub: any;
  public download_code: any;

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    public api: Api,
    public notify: NotifyService
  ) { }

  ngOnInit() {
    this.sub = this.activateRoute.params.subscribe(params => {
      if (params.download_code) {
        this.download_code = params.download_code;
        console.log(this.download_code);

      } else {
        this.download_code = 'error';
      }
    });
  }

  backToHome() {
    this.router.navigate(['/']);
  }

  download() {

    this.notify.showLoading();

    this.api.download(this.download_code).subscribe((res: any) => {
      this.notify.hideLoading();

      console.log(res);

      if (res.success) {
        let hiddenElement = document.getElementById('download');
        hiddenElement.setAttribute('href', res.url);
        hiddenElement.click();
      } else {
        this.notify.showNotification('error', 'failed');
      }

    }, error => {
      this.notify.hideLoading();
      this.notify.showNotification('error', 'failed');
    })
  }
}