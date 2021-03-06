import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import Moment from 'moment'

@IonicPage()
@Component({
  selector: 'page-criar-produtos',
  templateUrl: 'criar-produtos.html',
})
export class CriarProdutosPage {
  private formProduto: FormGroup;
  public loading
  public moment: any = Moment;
  public resultCreate: any;
  constructor(
    public fb: FormBuilder,
    public produtos: ProdutosProvider,
    public navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

      this.formProduto = fb.group({
        name: [null, [Validators.required]],
        quantity: [null, [Validators.required]],
        value: [null, [Validators.required]],
        validity: [null, [Validators.required]]
      })
  }

  ionViewDidLoad() {
  }

  submit(){
    this.showLoader();
    this.produtos.criarProdutos(this.formProduto.value).then((res)=>{
      this.resultCreate = res
      this.loading.dismiss()
      this.mostraMenssagem(this.resultCreate.message, 2500)
      this.navCtrl.setRoot('ProdutosPage')
    })
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    this.loading.present();
  }
  mostraMenssagem(message: string, duration?: number) {
    let menssagem = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    menssagem.present();
  }
}
