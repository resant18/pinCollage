class Api::PinsController < ApplicationController
    before_action :require_logged_in, only: [:create, :edit, :update, :destroy]    

    def index
      if params[:user_id]
        @pin = Pin.includes(:boards_pins, :boards)
              .where(user_id: params[:user_id])
              .page(params[:page]).per(10)
        
      elsif params[:board_id]
        @pin = Pin.includes(:boards_pins, :boards)
              .where(board_id: params[:board_id])
              .page(params[:page]).per(10)
      end
      render "api/pins/index"
    end

    def new 
      @pin = Pin.new
      @board = Board.all
    end

    def create
      @pin = Pin.new(pin_params)
      @board = Board.find(params[:board_id])

      if @pin.save
        @board.pins << @pin
        render "api/pins/show"
      else
        render json: @pin.errors.full_messages, status: 422
      end      
    end

    def edit 
      @pin = current_user.pins.find(params[:id])
      @board = Board.all
    end

    def update
      @pin = current_user.pins.find(params[:id])      

      if @pin.update(pin_params)        
        render "api/pins/show"
      else
        render json: @pin.errors.full_messages, status: 422
      end  
    end

    def destroy
      @pin = current_user.pins.find(params[:id])  
      @board_pin = current_user.boards_pins.find(params[:id])
      @board_pin.destroy
      @pin.destroy
      render "api/pins/show"
    end

    private

    def pin_params
      params.require(:pin).permit(:name, :detail, :lat, :lng, :board_id)
    end

    def board_pin_params
      params.require(:pin).permit(:board_id, :pin_id)
    end
end
